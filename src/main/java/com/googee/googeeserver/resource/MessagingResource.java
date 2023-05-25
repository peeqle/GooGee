package com.googee.googeeserver.resource;

import com.googee.googeeserver.data.service.message.MessageService;
import com.googee.googeeserver.models.chat.ChatMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.elasticsearch.common.Numbers;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.nio.charset.StandardCharsets;
import java.time.Instant;

@Log4j2
@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessagingResource {

	private final RabbitTemplate rabbitTemplate;

	private final SimpMessagingTemplate messagingTemplate;

	private static final String CHAT_MESSAGE_SEND = "/topic/chat.private.message";
	private static final String CHAT_EVENTS_SUB = "/topic/chat.{chatId}.events";
	private static final String CHAT_SESSION_SUB = "/topic/messages.subscribe";

	private final MessageService messageService;

	@MessageMapping(CHAT_MESSAGE_SEND)
	private void handleChatMessage(@Header("chatId") String chatId,
									  @Header("from") String senderId,
									  @Header("target") String targetId,
									  @Header("message") String messageContent) {
		if (!Numbers.isPositiveNumeric(senderId) || !Numbers.isPositiveNumeric(targetId)) {
			return;
		}
		MessageProperties messageProperties = new MessageProperties();
		messageProperties.setUserId(senderId);
		messageProperties.setReceivedUserId(targetId);

		ChatMessage chatMessage = new ChatMessage(new Message(messageContent.getBytes(StandardCharsets.UTF_8), messageProperties));
		chatMessage.setSendAt(Instant.now().toEpochMilli());
		chatMessage.setChatId(chatId);

		messageService.saveChatMessage(chatMessage);

		messagingTemplate.convertAndSend(CHAT_EVENTS_SUB.replace("{chatId}", chatId), chatMessage);
	}

	@SubscribeMapping(CHAT_EVENTS_SUB)
	private ChatMessage handleSubscribeOnChat() {
		return null;
	}

	@Component
	private class ChatMessageConsumer {

		@RabbitListener
		private void listenToMessage() {

		}
	}
}
