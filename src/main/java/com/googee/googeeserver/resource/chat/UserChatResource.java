package com.googee.googeeserver.resource.chat;

import com.googee.googeeserver.data.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class UserChatResource {

	private final ChatService chatService;

	@GetMapping("/fetch")
	public ResponseEntity<?> fetchUserChats(@RequestParam("pageOffset") int pageOffset, @RequestParam("pageLimit") int pageLimit) {
		return ResponseEntity.ok(chatService.fetchChatsForUser(pageOffset, pageLimit));
	}
}
