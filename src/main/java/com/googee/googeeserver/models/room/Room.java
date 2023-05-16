package com.googee.googeeserver.models.room;

import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {
	@Id
	@GeneratedValue
	private UUID uuid;

	private String roomName;

	private String roomDescription;

	@Cascade(CascadeType.MERGE)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "room_members", joinColumns = @JoinColumn(name = "id"))
	private Set<AppUser> members;

	@Cascade(CascadeType.MERGE)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "room_creators", joinColumns = @JoinColumn(name = "id"))
	private Set<AppUser> creators;

	private int maxMembers;

	private RoomOptions roomOptions;

	private boolean isEvent = false;

	private long closingAt;

	public static Room mapDTO(RoomDTO roomDTO) {
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
