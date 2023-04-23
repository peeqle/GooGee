package com.googee.googeeserver.resource.user;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.utils.log.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserResource {

	private final SecurityContextService securityContextService;

	private final LogService logService;

	private final AppUserServiceImpl appUserService;

	@GetMapping("/fetch/current")
	public ResponseEntity<AppUserDTO> fetchUserProfile() {
		String username = securityContextService.fetchCurrentUsername();
		try {
			AppUser appUser = appUserService.loadUserByUsername(username);
			if (appUser != null) {
				return ResponseEntity.ok(
					AppUserDTO.builder()
						.roles(appUser.getRoles().stream().toList())
						.lastActive(appUser.getLastActive())
						.username(username)
						.imageKey(appUser.getImageKey())
						.status(appUser.getStatus())
						.success(true)
						.build()
				);
			}
		} catch (UsernameNotFoundException e) {
			logService.saveLogMessage("Username exception on user profile fetch", e);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
