package com.googee.googeeserver.data.redis.service;

import com.googee.googeeserver.data.redis.HashNamespaces;
import com.googee.googeeserver.data.redis.HashNamespaces.*;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.utils.exceptions.ChatAlreadyExists;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;

import static java.lang.String.format;
import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class ChatService {
    //key, chatName, chat
    private final HashOperations<String, String, Chat> chatHashOperations;

    public void saveChat(Chat chat) {
        chatHashOperations.putIfAbsent(HashNamespaces.CHAT_HASH.getName(), chat.getChatName(), chat);
    }

    public void createChat(String chatName, AppUser appUser) throws ChatAlreadyExists {
        var chatCheck = chatHashOperations.get(HashNamespaces.CHAT_HASH.getName(), chatName);
        if (!isNull(chatCheck)) {
            throw new ChatAlreadyExists(format("Chat %s already exists", chatName));
        }
        Chat chat = Chat.builder()
                .chatName(chatName)
                .createdAt(Instant.now())
                .creator(appUser)
                .members(Arrays.asList(appUser))
                .build();

    }
}