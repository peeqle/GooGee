package com.googee.googeeserver.resource;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.chat.ChatService;
import com.googee.googeeserver.data.service.room.RoomService;
import com.googee.googeeserver.data.service.search.SearchElementType;
import com.googee.googeeserver.data.service.search.SearchService;
import com.googee.googeeserver.data.service.user.GeolocationService;
import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.room.RoomGeolocation;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.GeolocationCoordinates;
import com.googee.googeeserver.utils.helpers.RoomHelper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

import static com.googee.googeeserver.utils.helpers.RoomHelper.mapDTO;
import static com.googee.googeeserver.utils.helpers.RoomHelper.mapRoom;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomResource {

	private final RoomService roomService;

	private final ChatService chatService;

	private final SearchService searchService;

	private final GeolocationService geolocationService;

	private final Gson gson = new GsonBuilder().create();

	private final SecurityContextService securityContextService;

	@PostMapping("/create")
	public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO, @RequestParam(value = "editMode", defaultValue = "false") boolean editMode) {
		AppUser appUser = securityContextService.fetchCurrentUser();
		if (roomDTO != null) {
			Room room = mapDTO(roomDTO);

			Set<AppUser> creators = room.getCreators();
			creators.addAll(roomDTO.getCreators().stream().map(AppUser::new).collect(Collectors.toSet()));
			room.setCreators(creators);
			creators.add(appUser);

			Set<AppUser> members = room.getMembers();
			members.addAll(roomDTO.getMembers().stream().map(AppUser::new).collect(Collectors.toSet()));
			room.setMembers(members);
			if (!editMode) {
				RoomDTO savedRoom = roomService.saveRoom(room, roomDTO.getLocation().getCoords());
				searchService.saveSearchElement(room.getRoomName(), room.getUuid().toString(), SearchElementType.ROOM);
				if (savedRoom.getRoomOptions().isCreateChatRoomCreate()) {
					Chat chat = new Chat();
					chat.setChatName(savedRoom.getRoomName());
					chat.setCreatedAt(Instant.now().toEpochMilli());
					chat.setPrivateRoom(false);
					chat.setImageKey(room.getRoomOptions().getRoomImageKey());

					List<AppUser> chatMembers = new ArrayList<>();
					chatMembers.addAll(room.getMembers());
					chatMembers.addAll(room.getCreators());
					chat.setMembers(chatMembers);

					chatService.save(chat);
				}
				return ResponseEntity.ok(savedRoom);
			}

			Room fetchedRoom = roomService.fetchRoomById(roomDTO.getUuid());
			room.setUuid(roomDTO.getUuid());
			var roomMembers = fetchedRoom.getMembers();
			roomMembers.addAll(members);
			room.setMembers(roomMembers);

			Room savedRoom = roomService.saveRoom(room);
			RoomDTO resultDto = mapRoom(savedRoom);
			return ResponseEntity.ok(resultDto);
		}
		return ResponseEntity.status(NOT_FOUND).build();
	}

	@GetMapping("/fetch")
	public ResponseEntity<Map<String, Object>> fetchRooms(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam("limit") int limit) {
		List<Room> creatorRooms = roomService.fetchUserCreatorRoom(PageRequest.of(page, limit)).getContent();

		List<Room> memberRooms = roomService.fetchUserMemberRoom(PageRequest.of(page, limit)).getContent();

		Map<String, Object> result = new HashMap<>();

		result.put("createdRooms", creatorRooms.stream().map(RoomHelper::mapRoom).toList());
		result.put("memberRooms", memberRooms.stream().map(RoomHelper::mapRoom).toList());

		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Object> deleteById(@RequestParam("roomId") String roomId) {
		if (roomId != null && !roomId.isEmpty()) {
			UUID roomUUID = UUID.fromString(roomId);

			Room room = roomService.fetchRoomById(roomUUID);
			if (room != null) {
				AppUser appUser = securityContextService.fetchCurrentUser();

				if (room.getCreators().stream().map(AppUser::getId).toList().contains(appUser.getId())) {
					roomService.deleteRoomById(roomUUID);
					return ResponseEntity.status(HttpStatus.OK).build();
				}
			}
		}
		return ResponseEntity.status(NOT_FOUND).build();
	}

	@GetMapping("/near")
	public ResponseEntity<List<RoomDTO>> fetchNearUserLocation() {
		AppUser appUser = securityContextService.fetchCurrentUser();
		var lastLocation = geolocationService.fetchUserLocation(appUser.getUsername());

		if (lastLocation == null) {
			return ResponseEntity.status(NOT_FOUND).build();
		}
		return ResponseEntity.ok(roomService.fetchRoomsNearUserLocation(lastLocation.getCoords(), appUser));
	}
}
