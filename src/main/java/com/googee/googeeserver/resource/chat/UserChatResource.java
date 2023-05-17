package com.googee.googeeserver.resource.chat;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.chat.ChatService;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class UserChatResource {

	private final ChatService chatService;

	private final SecurityContextService securityContextService;

	@GetMapping("/fetch")
	public ResponseEntity<?> fetchUserChats(@RequestParam("page") int pageOffset, @RequestParam("limit") int pageLimit) {
		return ResponseEntity.ok(chatService.fetchChatsForUser(pageOffset, pageLimit));
	}

	@PostMapping("/create")
	public ResponseEntity<ChatDTO> createNewChat(@RequestParam("chatName") String chatName) {
		AppUser creatorUser = securityContextService.fetchCurrentUser();
		Chat chat = Chat.builder()
			.chatName(chatName)
			.createdAt(Instant.now().toEpochMilli())
			.creator(creatorUser)
			.members(Collections.singleton(creatorUser))
			.build();

		if (chatService.save(chat) != null) {
			return ResponseEntity.ok(chat);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
