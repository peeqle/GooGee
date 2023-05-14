package com.googee.googeeserver.config.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mq/notification")
public class NotificationRESTController {

	private final RabbitTemplate rabbitTemplate;

	@GetMapping("/global")
	public List<String> fetchQueueNotifications() {
		List<String> messages = new ArrayList<>();

		while (true) {
			Object message = rabbitTemplate.receiveAndConvert("globalNotification");
			if (message == null) {
				break;
			}
			messages.add(message.toString());
		}

		return messages;
	}
}
