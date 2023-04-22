package com.googee.googeeserver.config.security;

import com.googee.googeeserver.config.security.service.LogoutService;
import com.googee.googeeserver.models.user.AppUser;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.PackagePrivate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Data
@Service
public class UserContextService {

	private AppUser currentUserContext;
	@Autowired
	private final LogoutService logoutService;

	public boolean checkCurrentUser() {
		if (this.currentUserContext == null) {
			SecurityContextHolder.getContext().setAuthentication(null);
			return false;
		}
		return true;
	}

	public Long getCurrentUserId() {
		if (checkCurrentUser()) {
			return this.currentUserContext.getId();
		}
		return null;
	}
}
