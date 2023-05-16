package com.googee.googeeserver.resource;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.room.RoomService;
import com.googee.googeeserver.models.DTO.room.RoomDTO;
import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomResource {

	private final RoomService roomService;

	private final SecurityContextService securityContextService;
	@PostMapping("/create")
	public ResponseEntity<Response> createRoom(@RequestBody RoomDTO roomDTO) {
		AppUser appUser = securityContextService.fetchCurrentUser();
		if (roomDTO != null) {
			Room room = Room.mapDTO(roomDTO);
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.status(NOT_FOUND).build();
	}
}
