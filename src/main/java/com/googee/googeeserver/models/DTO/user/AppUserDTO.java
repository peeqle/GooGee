package com.googee.googeeserver.models.DTO.user;

import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class AppUserDTO extends Response implements Serializable {

	private Long id;

	private String imageKey;

	private String username;

	private String email;

	private String status;

	private Long lastActive;

	private List<Role> roles;

	private int friendsCount;

	private int eventsVisited;

	@Builder
	public AppUserDTO(Long id, boolean success, long transactionTime, String imageKey, String username, String email, String status, Long lastActive, List<Role> roles, int friendsCount, int eventsVisited) {
		super(success, transactionTime);
		this.id = id;
		this.imageKey = imageKey;
		this.username = username;
		this.email = email;
		this.status = status;
		this.lastActive = lastActive;
		this.roles = roles;
		this.friendsCount = friendsCount;
		this.eventsVisited = eventsVisited;
	}
}
