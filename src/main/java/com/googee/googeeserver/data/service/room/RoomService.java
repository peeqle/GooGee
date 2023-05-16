package com.googee.googeeserver.data.service.room;

import com.googee.googeeserver.data.repo.RoomRepository;
import com.googee.googeeserver.data.service.NotificationService;
import com.googee.googeeserver.models.room.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

	private final NotificationService notificationService;

	private final RoomRepository roomRepository;

	public boolean saveRoom(Room room) {
		roomRepository.save(room);
		return true;
	}
}
