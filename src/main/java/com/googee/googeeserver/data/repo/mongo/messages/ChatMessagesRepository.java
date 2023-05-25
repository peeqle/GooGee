package com.googee.googeeserver.data.repo.mongo.messages;

import com.googee.googeeserver.models.chat.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessagesRepository extends MongoRepository<ChatMessage, String> {
}
