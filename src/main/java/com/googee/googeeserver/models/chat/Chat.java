package com.googee.googeeserver.models.chat;

import ch.qos.logback.core.status.InfoStatus;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chat extends ChatDTO implements Serializable {
	@Id
	@GeneratedValue
	private UUID id;

	private String chatName;

	private Long createdAt = Instant.now().toEpochMilli();

	private Long lastMessage;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id")
	private AppUser creator;

	@OneToMany(cascade = CascadeType.PERSIST)
	private Set<AppUser> members = new HashSet<>();
}
