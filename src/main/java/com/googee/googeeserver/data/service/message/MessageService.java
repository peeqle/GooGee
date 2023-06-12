package com.googee.googeeserver.data.service.message;

import com.googee.googeeserver.data.repo.mongo.messages.ChatMessagesRepository;
import com.googee.googeeserver.models.chat.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

	private final MongoTemplate mongoTemplate;

	private final ChatMessagesRepository chatMessagesRepository;

	public void saveChatMessage(ChatMessage message) {
		chatMessagesRepository.save(message);
	}

	public List<ChatMessage> fetchChatMessages(String chatId, int page, int limit) {
		Pageable pageable = PageRequest.of(page, limit);
		Query query = new Query();
		query.addCriteria(Criteria.where("chatId").is(chatId));
		query.with(Sort.by(Sort.Direction.DESC, "sendAt"));
		query.collation(Collation.simple().numericOrdering(true));
		query.with(pageable);
		query.allowDiskUse(true);

		return mongoTemplate.find(query, ChatMessage.class);
	}
}
