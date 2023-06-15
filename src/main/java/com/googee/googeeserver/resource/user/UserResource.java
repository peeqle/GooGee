package com.googee.googeeserver.resource.user;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.AppUserAdditionalInfo;
import com.googee.googeeserver.utils.log.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserResource {

	private final LogService logService;

	private final SecurityContextService securityContextService;

	private final AppUserServiceImpl appUserService;

	@GetMapping("/fetch/current")
	public ResponseEntity<AppUserDTO> fetchUserProfile() {
		String username = securityContextService.fetchCurrentUsername();
		try {
			AppUser appUser = appUserService.loadUserByUsername(username);
			if (appUser != null) {
				return ResponseEntity.ok(
					mapUser(appUser)
				);
			}
		} catch (UsernameNotFoundException e) {
			logService.saveLogMessage("Username exception on user profile fetch", e);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	private AppUserDTO mapUser(AppUser appUser) {
		return AppUserDTO.builder()
			.id(appUser.getId())
			.roles(appUser.getRoles().stream().toList())
			.lastActive(appUser.getLastActive())
			.username(appUser.getUsername())
			.email(appUser.getEmail())
			.imageKey(appUser.getImageKey())
			.status(appUser.getStatus())
			.friendsCount(appUser.getFriendlyUsers().size())
			.eventsVisited(appUser.getAppUserAdditionalInfo().getEventsVisited())
			.appUserAdditionalInfo(appUser.getAppUserAdditionalInfo())
			.success(true)
			.build();
	}

	@GetMapping("/fetch")
	public ResponseEntity<AppUserDTO> fetchUserProfile(@RequestParam("userId") Long id) {

		try {
			AppUser appUser = appUserService.tryGetAppUserById(id);
			if (appUser != null) {
				return ResponseEntity.ok(
					AppUserDTO.builder()
						.id(appUser.getId())
						.roles(appUser.getRoles().stream().toList())
						.lastActive(appUser.getLastActive())
						.username(appUser.getUsername())
						.email(appUser.getEmail())
						.imageKey(appUser.getImageKey())
						.status(appUser.getStatus())
						.friendsCount(appUser.getFriendlyUsers().size())
						.eventsVisited(appUser.getAppUserAdditionalInfo().getEventsVisited())
						.success(true)
						.build()
				);
			}
		} catch (UsernameNotFoundException e) {
			logService.saveLogMessage("Username exception on user profile fetch", e);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/add/friends")
	public ResponseEntity addToFriends(@RequestParam("userId") long id) {
		AppUser currentUser = securityContextService.fetchCurrentUser();

		appUserService.addToFriends(currentUser, id);

		AppUser target = appUserService.tryGetAppUserById(id);
		appUserService.addToFriends(target, currentUser.getId());

		return ResponseEntity.ok().build();
	}

	@PutMapping("/current/update")
	public ResponseEntity<AppUserDTO> updateCurrentUser(@RequestBody AppUserDTO user) {
		AppUser currentUser = securityContextService.fetchCurrentUser();

		currentUser.setStatus(user.getStatus());
		currentUser.setEmail(user.getEmail());
		currentUser.setImageKey(user.getImageKey());

		var userd = this.appUserService.save(currentUser);
		return ResponseEntity.ok(mapUser(userd));
	}

	@PutMapping("/current/update/additional")
	public ResponseEntity<AppUserDTO> updateCurrentUser(@RequestBody AppUserAdditionalInfo appUserAdditionalInfo) {
		AppUser currentUser = securityContextService.fetchCurrentUser();

		currentUser.setAppUserAdditionalInfo(appUserAdditionalInfo);

		var user = this.appUserService.save(currentUser);
		return ResponseEntity.ok(mapUser(user));
	}

	//todo make page
	@GetMapping("/fetch/friends")
	public ResponseEntity<List<AppUserDTO>> fetchCurrentUserFriends(@RequestParam("userId") Long userId) {
		try {
			AppUser appUser = appUserService.tryGetAppUserById(userId);
			if (appUser != null) {
				return ResponseEntity.ok(appUser.getFriendlyUsers().stream().map(this::mapUser).toList());
			}
		} catch (UsernameNotFoundException e) {
			logService.saveLogMessage("Username exception on user profile fetch", e);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
