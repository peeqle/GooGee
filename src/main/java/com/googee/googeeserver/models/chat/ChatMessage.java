package com.googee.googeeserver.models.chat;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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

	public ChatMessage(Message message) {
		this.message = message;
	}

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Message implements Serializable{
		private String userId;

		private String receiverId;

		private byte[] content;
	}
}
