package com.googee.googeeserver.resource.location;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.user.GeolocationService;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.Geolocation;
import io.lettuce.core.SetArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/location")
@RequiredArgsConstructor
public class UserLocationResource {

	private final GeolocationService geolocationService;

	private final SecurityContextService securityContextService;

	@GetMapping("/friends")
	public ResponseEntity<List<Geolocation>> fetchFriendsLocation() {
		AppUser appUser = securityContextService.fetchCurrentUser();

		Set<AppUser> userFriends = appUser.getFriendlyUsers();

		return ResponseEntity.ok(geolocationService.fetchUsersLocation(userFriends));
	}
}
