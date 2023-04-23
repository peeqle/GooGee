package com.googee.googeeserver.models.DTO.user;

import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class AppUserDTO extends Response implements Serializable {

	private String imageKey;

	private String username;

	private String status;

	private Long lastActive;

	private List<Role> roles;

	@Builder
	public AppUserDTO(boolean success, long transactionTime, String imageKey, String username, String status, Long lastActive, List<Role> roles) {
		super(success, transactionTime);
		this.imageKey = imageKey;
		this.username = username;
		this.status = status;
		this.lastActive = lastActive;
		this.roles = roles;
	}
}
