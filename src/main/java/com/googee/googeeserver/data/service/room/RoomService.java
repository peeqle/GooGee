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

@Service
@RequiredArgsConstructor
public class RoomService {
	private final RoomRepository roomRepository;

	private final NotificationService notificationService;

	private final SecurityContextService securityContextService;

	public boolean saveRoom(Room room) {
		roomRepository.save(room);
		return true;
	}

	public Page<Room> fetchUserRooms(Pageable pageable) {
		AppUser appUser = securityContextService.fetchCurrentUser();

		return roomRepository.findAllByMembersContaining(appUser, pageable);
	}
}
