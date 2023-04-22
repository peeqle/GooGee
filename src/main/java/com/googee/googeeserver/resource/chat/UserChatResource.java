package com.googee.googeeserver.resource.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/chat")
public class UserChatResource {

	@GetMapping("/fetch")
	public ResponseEntity<?> fetchUserChats(@RequestParam("pageOffset") int pageOffset, @RequestParam("pageLimit") int pageLimit) {


		return ResponseEntity.ok(new Object());
	}
}
