package com.googee.googeeserver.config.security.service;

import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.utils.log.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class SecurityContextService {

	private final LogService logService;

	private final AppUserServiceImpl appUserService;

	public String fetchCurrentUsername() {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();
		Object principal = authentication.getPrincipal();
		String username = null;
		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}
		return username;
	}

	public AppUser fetchCurrentUser() {
		String currentUsername = fetchCurrentUsername();
		if (currentUsername == null || currentUsername.isEmpty()) {
			SecurityContextHolder.getContext().setAuthentication(null);

			logService.saveLogMessage(format("%s, username is null. Logged out.", this.getClass().getName()), new UsernameNotFoundException(this.getClass().getName()));
			return null;
		}

		return appUserService.findAppUserByUsername(currentUsername);
	}
}
