package com.googee.googeeserver.utils.helpers;

import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.GeolocationCoordinates;

import java.util.HashSet;

public class RoomHelper {
	public static RoomDTO mapRoom(Room room) {
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

	public static Room mapDTO(RoomDTO roomDTO) {
		return Room.builder()
			.roomName(roomDTO.getRoomName())
			.roomDescription(roomDTO.getRoomDescription())
			.maxMembers(roomDTO.getMaxMembers())
			.roomOptions(roomDTO.getRoomOptions())
			.isEvent(roomDTO.isEvent())
			.members(new HashSet<>())
			.creators(new HashSet<>())
			.closingAt(roomDTO.getClosingAt())
			.build();
	}
}
