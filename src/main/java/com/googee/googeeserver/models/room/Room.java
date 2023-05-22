package com.googee.googeeserver.models.room;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.hibernate.annotations.CascadeType.PERSIST;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String roomName;

	private String roomDescription;

	@Cascade(CascadeType.MERGE)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "room_members", joinColumns = @JoinColumn(name = "id"))
	private Set<AppUser> members;

	@Cascade(org.hibernate.annotations.CascadeType.MERGE)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "room_creators", joinColumns = @JoinColumn(name = "id"))
	private Set<AppUser> creators;

	private int maxMembers;

	private RoomOptions roomOptions = new RoomOptions();

	private boolean isEvent = false;

	private long closingAt;

	public void addCreator(AppUser appUser) {
		this.creators.add(appUser);
	}
}
