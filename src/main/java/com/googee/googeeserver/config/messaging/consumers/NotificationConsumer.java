package com.googee.googeeserver.config.messaging.consumers;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.googee.googeeserver.config.messaging.NotificationController.GLOBAL_NOTIFICATION;
import static com.googee.googeeserver.config.messaging.NotificationController.GLOBAL_NOTIFICATIONS_PATH;

/**
 * Class responsive for redirection of incoming notifications & saving for unsubscribed users
 */
@Component
public class NotificationConsumer {
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	private final ConcurrentLinkedQueue<String> messageBuffer = new ConcurrentLinkedQueue<String>();
	private final Map<String, Boolean> subscriptions = new HashMap<>();

	@RabbitListener(queues = GLOBAL_NOTIFICATION)
	public void receiveGlobalNotifications(Message message) {
		String body = new String(message.getBody());
		messageBuffer.add(body);
		sendMessagesToSubscribedClients();
	}

	public void addSubscription(String sessionId) {
		this.subscriptions.put(sessionId, true);
	}

	public void removeSubscription(String sessionId) {
		subscriptions.remove(sessionId);
	}

	private void sendMessagesToSubscribedClients() {
		String message;
		while ((message = messageBuffer.poll()) != null) {
			for (String sessionId : subscriptions.keySet()) {
				messagingTemplate.convertAndSend(GLOBAL_NOTIFICATIONS_PATH.replace("{sessionId}", sessionId), message);
			}
		}
	}
}
