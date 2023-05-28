package com.googee.googeeserver.data.service.message;

import com.googee.googeeserver.data.repo.mongo.messages.ChatMessagesRepository;
import com.googee.googeeserver.models.chat.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

	private final MongoTemplate mongoTemplate;

	private final ChatMessagesRepository chatMessagesRepository;

	public void saveChatMessage(ChatMessage message) {
		chatMessagesRepository.save(message);
	}

	//todo add filters
	public Page<ChatMessage> fetchChatMessages(String chatId, int page, int limit) {
		Pageable pageable = PageRequest.of(page, limit);


		return chatMessagesRepository.findAllByChatId(chatId, pageable);
	}
}
