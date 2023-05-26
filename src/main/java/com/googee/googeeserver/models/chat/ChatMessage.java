package com.googee.googeeserver.models.chat;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serial;
import java.io.Serializable;

@Data
@Document
@RequiredArgsConstructor
public class ChatMessage implements Serializable {
	@Serial
	private static final long serialVersionUID = 2837238942334423L;
	@Id
	private String id;

	private String chatId;

	private Long sendAt;

	private Message message;

	private boolean isRead = false;

	public ChatMessage (Message message) {
		this.message = message;
	}
}
