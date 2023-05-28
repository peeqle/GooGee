package com.googee.googeeserver.data.repo.mongo.messages;

import com.googee.googeeserver.models.chat.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessagesRepository extends MongoRepository<ChatMessage, String> {

	Page<ChatMessage> findAllByChatId(String chatId, Pageable pageable);
}
