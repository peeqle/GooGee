package com.googee.googeeserver.models.DTO.room;

import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.room.RoomOptions;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class RoomDTO extends Response implements Serializable {

	private UUID uuid;

	private String roomName;

	private String roomDescription;

	private int maxMembers;

	private RoomOptions roomOptions;

	private boolean isEvent = false;

	private long closingAt;

	private List<Long> creators = new ArrayList<>();

	private List<Long> members = new ArrayList<>();
}
