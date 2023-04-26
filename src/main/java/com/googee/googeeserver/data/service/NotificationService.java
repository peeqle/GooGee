package com.googee.googeeserver.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

	private final RabbitTemplate rabbitTemplate;

	private final SimpMessagingTemplate messagingTemplate;

	public void sendGlobalNotification() {

	}

	public void sendUserNotification() {

	}

	public void sendTargetNotification() {

	}

	public void sendAlexandrPistoletovSignedNotification() {

	}
}
