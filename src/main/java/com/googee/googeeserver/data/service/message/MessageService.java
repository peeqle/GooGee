package com.googee.googeeserver.data.service.message;

import com.googee.googeeserver.data.repo.mongo.messages.ChatMessagesRepository;
import com.googee.googeeserver.models.chat.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

	private final ChatMessagesRepository chatMessagesRepository;

	public void saveChatMessage(ChatMessage message) {
		chatMessagesRepository.save(message);
	}
}
