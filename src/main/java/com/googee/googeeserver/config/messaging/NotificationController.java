package com.googee.googeeserver.config.messaging;

import com.googee.googeeserver.config.messaging.consumers.NotificationConsumer;
import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

@Log4j2
@Controller
@RequiredArgsConstructor
public class NotificationController {

	private final RabbitTemplate rabbitTemplate;

	private final SimpMessagingTemplate messagingTemplate;

	private final NotificationConsumer notificationConsumer;

	private final SecurityContextService securityContextService;

	public final static String GLOBAL_NOTIFICATIONS_PATH = "/topic/notifications.global";
	public final static String GLOBAL_NOTIFICATIONS_SUB_PATH = "/topic/notifications.global.subscribe.{sessionId}";
	public final static String GLOBAL_NOTIFICATIONS_UNSUB_PATH = "/topic/notifications.global.unsubscribe.{sessionId}";

	public final static String GLOBAL_NOTIFICATION = "globalNotification";

	public void sendGlobal() {
		rabbitTemplate.convertAndSend(GLOBAL_NOTIFICATION, "NotificationXXXXXXXXXXXXXXXX");
	}

	@SubscribeMapping(GLOBAL_NOTIFICATIONS_PATH)
	public Message globalNotificationSubscription() {
		return null;
	}

	@MessageMapping(GLOBAL_NOTIFICATIONS_SUB_PATH)
	public void setGlobalNotifications(@DestinationVariable("sessionId") String sessionId){
		notificationConsumer.addSubscription(sessionId);
	}

	@MessageMapping(GLOBAL_NOTIFICATIONS_UNSUB_PATH)
	public void unsubscribeFromMessages() {
		AppUser appUser = securityContextService.fetchCurrentUser();
		notificationConsumer.removeSubscription(appUser.getId().toString());
	}
}
