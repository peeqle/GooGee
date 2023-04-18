package com.googee.googeeserver.resource;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Log4j2
@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessagingResource {

    private static final String SEND_PLAIN_MESSAGE = "/topic/message.send";
    public static final String PLAIN_MESSAGE_EVENT = "/topic/message.event";

    public static final String DIRECT_PLAIN_MESSAGE_EVENT = "/topic/message.{chat_id}.event";


    public static final String CREATE_CHAT_EVENT = "/topic/message.{chat_id}.event";
    private static final String CREATE_CHAT = "/topic/create.chat";

    private static final String DELETE_CHAT = "/topic/delete.chat.{chat_id}";
    private static final String UPDATE_CHAT = "/topic/update.chat.{chat_id}";
    private static final String CLEAR_CHAT = "/topic/clear.chat.{chat_id}";

    public static final String DELETE_CHAT_EVENT = "/topic/delete.chat.event";
    public static final String UPDATE_CHAT_EVENT = "/topic/update.chat.event";
    public static final String CLEAR_CHAT_EVENT = "/topic/clear.chat.event";


}
