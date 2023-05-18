package com.googee.googeeserver.models.chat;

import ch.qos.logback.core.status.InfoStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.Instant;
import java.util.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chat implements Serializable {
	@Id
	@GeneratedValue
	private UUID id;

	private String chatName;

	private Long createdAt = Instant.now().toEpochMilli();

	private Long lastMessage;

	private boolean privateRoom = true;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.PERSIST)
	private List<AppUser> members = new ArrayList<>();
}
