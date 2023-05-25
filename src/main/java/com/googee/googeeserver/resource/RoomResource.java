package com.googee.googeeserver.resource;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.room.RoomService;
import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomResource {

	private final RoomService roomService;

	private final Gson gson = new GsonBuilder().create();

	private final SecurityContextService securityContextService;

	@PostMapping("/create")
	public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO) {
		AppUser appUser = securityContextService.fetchCurrentUser();
		if (roomDTO != null) {
			Room room = mapDTO(roomDTO);
			room.setCreators(roomDTO.getCreators().stream().map(AppUser::new).collect(Collectors.toSet()));
			room.setMembers(roomDTO.getMembers().stream().map(AppUser::new).collect(Collectors.toSet()));
			room.addCreator(appUser);

			roomService.saveRoom(room);
			RoomDTO resultDto = mapRoom(room);
			return ResponseEntity.ok(resultDto);
		}
		return ResponseEntity.status(NOT_FOUND).build();
	}

	@GetMapping("/fetch")
	public ResponseEntity<Map<String, Object>> fetchRooms(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam("limit") int limit) {
		List<Room> creatorRooms = roomService.fetchUserCreatorRoom(PageRequest.of(page, limit)).getContent();

		List<Room> memberRooms = roomService.fetchUserMemberRoom(PageRequest.of(page, limit)).getContent();

		Map<String, Object> result = new HashMap<>();

		result.put("createdRooms", creatorRooms.stream().map(this::mapRoom).toList());
		result.put("memberRooms", memberRooms.stream().map(this::mapRoom).toList());

		return ResponseEntity.ok(result);
	}

	private RoomDTO mapRoom(Room room) {
		return RoomDTO.builder()
			.creators(room.getCreators().stream().map(AppUser::getId).toList())
			.members(room.getMembers().stream().map(AppUser::getId).toList())
			.roomOptions(room.getRoomOptions())
			.roomName(room.getRoomName())
			.roomDescription(room.getRoomDescription())
			.isEvent(room.isEvent())
			.closingAt(room.getClosingAt())
			.maxMembers(room.getMaxMembers())
			.uuid(room.getUuid())
			.build();
	}

	private static Room mapDTO(RoomDTO roomDTO) {
		return Room.builder()
			.roomName(roomDTO.getRoomName())
			.roomDescription(roomDTO.getRoomDescription())
			.maxMembers(roomDTO.getMaxMembers())
			.roomOptions(roomDTO.getRoomOptions())
			.isEvent(roomDTO.isEvent())
			.closingAt(roomDTO.getClosingAt())
			.build();
	}
}
