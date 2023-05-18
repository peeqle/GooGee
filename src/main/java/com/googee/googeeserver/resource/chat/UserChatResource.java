package com.googee.googeeserver.resource.chat;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.chat.ChatService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.common.recycler.Recycler;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class UserChatResource {

	private final ChatService chatService;

	private final AppUserServiceImpl appUserService;

	private final SecurityContextService securityContextService;

	@GetMapping("/fetch")
	public ResponseEntity<Page<Chat>> fetchUserChats(@RequestParam("page") int pageOffset, @RequestParam("limit") int pageLimit) {
		Page<Chat> response = chatService.fetchChatsForUser(pageOffset, pageLimit);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/create")
	public ResponseEntity<ChatDTO> createNewChat(@RequestParam("chatName") String chatName) {
		AppUser creatorUser = securityContextService.fetchCurrentUser();
		Chat chat = Chat.builder()
			.chatName(chatName)
			.createdAt(Instant.now().toEpochMilli())
			.members(List.of(creatorUser))
			.build();

		if (chatService.save(chat) != null) {
			return ResponseEntity.ok(ChatDTO.builder().chatName(chatName).creatorUser(creatorUser).createdAt(Instant.now().toEpochMilli()).build());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/create/room")
	public ResponseEntity<?> createNewRoom(@RequestBody AppUserDTO appUserDTO) {
		AppUser appUser = securityContextService.fetchCurrentUser();

		AppUser participant = appUserService.tryGetAppUserById(appUserDTO.getId());
		if(participant != null) {
			Chat chat = Chat.builder()
				.chatName(participant.getUsername())
				.createdAt(Instant.now().toEpochMilli())
				.privateRoom(true)
				.members(List.of(appUser, participant))
				.build();

			return ResponseEntity.ok(chatService.save(chat));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
