package com.googee.googeeserver.data.service.room;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.repo.RoomRepository;
import com.googee.googeeserver.data.service.NotificationService;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {
	private final RoomRepository roomRepository;

	private final NotificationService notificationService;

	private final SecurityContextService securityContextService;

	public Room saveRoom(Room room) {
		return roomRepository.save(room);
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
}
