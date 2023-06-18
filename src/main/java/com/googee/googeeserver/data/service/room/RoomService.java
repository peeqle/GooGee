package com.googee.googeeserver.data.service.room;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.repo.RoomRepository;
import com.googee.googeeserver.data.service.NotificationService;
import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.room.RoomGeolocation;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.GeolocationCoordinates;
import com.googee.googeeserver.utils.helpers.RoomHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {
	private final MongoTemplate mongoTemplate;

	private final RoomRepository roomRepository;

	private final NotificationService notificationService;

	private final SecurityContextService securityContextService;

	public Room saveRoom(Room room) {
		return roomRepository.save(room);
	}

	public RoomDTO saveRoom(Room room, GeolocationCoordinates geolocationCoordinates) {
		Room saved = roomRepository.save(room);
		boolean exists = roomGeolocationDataExists(saved.getUuid().toString());
		RoomDTO roomDto = RoomHelper.mapRoom(saved);
		long epochMilli = Instant.now().toEpochMilli();
		if (exists) {
			Query query = new Query(Criteria.where("username").is(saved.getUuid().toString()));
			Update update = new Update()
				.set("coords", geolocationCoordinates)
				.set("timestamp", epochMilli);
			mongoTemplate.updateFirst(query, update, RoomGeolocation.class);
			roomDto.setGeolocation(RoomGeolocation.builder().roomUUID(saved.getUuid().toString())
				.coords(geolocationCoordinates)
				.timestamp(epochMilli).build());
		} else {
			roomDto.setGeolocation(mongoTemplate.save(RoomGeolocation.builder()
				.roomUUID(saved.getUuid().toString())
				.coords(geolocationCoordinates)
				.timestamp(epochMilli).build()));
		}
		return roomDto;
	}

	public boolean roomGeolocationDataExists(String roomUuid) {
		Query query = new Query(Criteria.where("roomUUID").is(roomUuid));
		return mongoTemplate.findOne(query, RoomGeolocation.class) != null;
	}

	public void deleteRoomById(UUID roomId) {
		roomRepository.deleteById(roomId);
	}

	public Room fetchRoomById(UUID roomId) {
		return roomRepository.findById(roomId).orElseThrow();
	}

	public Page<Room> fetchUserCreatorRoom(Pageable pageable) {
		AppUser appUser = securityContextService.fetchCurrentUser();

		return roomRepository.findAllByCreatorsContaining(appUser, pageable);
	}

	public Page<Room> fetchUserMemberRoom(Pageable pageable) {
		AppUser appUser = securityContextService.fetchCurrentUser();

		return roomRepository.findAllByMembersContaining(appUser, pageable);
	}

	public List<RoomDTO> fetchRoomsNearUserLocation(GeolocationCoordinates geolocationCoordinates, AppUser appUser) {
		Point point = new Point(geolocationCoordinates.getLocation().getX(), geolocationCoordinates.getLocation().getY());
		var collection = mongoTemplate.getCollection("roomGeolocation");

		NearQuery query = NearQuery.near(point)
			.maxDistance(appUser.getAppUserAdditionalInfo().getMaxEventDistance() / 1000.0)
			.in(Metrics.KILOMETERS)
			.query(new Query(Criteria.where("coords")));

		GeoResults<RoomGeolocation> roomGeolocations = mongoTemplate.geoNear(query, RoomGeolocation.class);
		List<RoomDTO> roomDTOList = new ArrayList<>();

//		for (RoomGeolocation roomGeolocation : roomGeolocations) {
//			Room room = fetchRoomById(UUID.fromString(roomGeolocation.getRoomUUID()));
//			if (room != null) {
//				RoomDTO roomDTO = RoomHelper.mapRoom(room);
//				roomDTO.setLocation(roomGeolocation);
//				roomDTOList.add(roomDTO);
//			}
//		}

		return roomDTOList;
	}

	public boolean addMember(UUID roomId, AppUser currentUser) {
		Room room = fetchRoomById(roomId);
		if(room != null) {
			room.addMember(currentUser);
			room.getRoomChat().addMember(currentUser);
			return saveRoom(room) != null;
		}
		return false;
	}
}
