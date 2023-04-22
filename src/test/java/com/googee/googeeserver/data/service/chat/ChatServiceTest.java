package com.googee.googeeserver.data.service.chat;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor
class ChatServiceTest {
	@Autowired
	ChatService chatService;

	@Test
	public void testFetchOfChats() {
		chatService.fetchChatsForUser(9L, 1, 15);
	}
}