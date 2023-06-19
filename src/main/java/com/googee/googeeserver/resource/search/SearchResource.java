package com.googee.googeeserver.resource.search;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.room.RoomService;
import com.googee.googeeserver.data.service.search.SearchElementType;
import com.googee.googeeserver.data.service.search.SearchService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.search.SearchElement;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchResource {

	private final RoomService roomService;

	private final SearchService searchService;

	private final AppUserServiceImpl appUserService;

	private final SecurityContextService securityContextService;

	@GetMapping
	public ResponseEntity<List<SearchElement>> findByParameters(@RequestParam("query") String query,
																@RequestParam(value = "limit", defaultValue = "30") int limit,
																@RequestParam(value = "offset", defaultValue = "0") int offset) {
		String username = securityContextService.fetchCurrentUsername();

		if (query == null || query.isEmpty()) {
			return ResponseEntity.status(NOT_FOUND).build();
		}
		return ResponseEntity.ok(searchService.findByParameters(query, limit, offset, username));
	}

	@GetMapping("/users")
	public ResponseEntity<List<SearchElement>> findByParameters(@RequestParam(value = "limit", defaultValue = "30") int limit,
																@RequestParam(value = "offset", defaultValue = "0") int offset) {
		AppUser user = securityContextService.fetchCurrentUser();

		return ResponseEntity.ok(searchService.findNearestUsers(limit, offset, user));
	}

	@PostMapping("/add")
	public boolean addElement(@RequestParam("id") String id,
							  @RequestParam("type") SearchElementType elementType) {
		AppUser currentUser = securityContextService.fetchCurrentUser();
		var success = false;
		if (elementType != null && (id != null && !id.isEmpty())) {
			switch (elementType) {
				case ROOM -> {
					UUID roomId = UUID.fromString(id);
					success = roomService.addMember(roomId, currentUser);
				}
				case USER -> {
					Long userId = Long.valueOf(id);
					success = appUserService.addToFriends(currentUser, userId);
				}
				default -> {
					break;
				}
			}
		}
		return success;
	}
}
