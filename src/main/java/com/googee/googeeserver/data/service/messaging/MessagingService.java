package com.googee.googeeserver.data.service.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessagingService {

    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(String exchange, GenericMessage message) {
        rabbitTemplate.convertAndSend(exchange, message);
    }
}
