package com.googee.googeeserver.models.chat;

import ch.qos.logback.core.status.InfoStatus;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

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

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id")
	private AppUser creator;

	@OneToMany(cascade = CascadeType.PERSIST)
	private List<AppUser> members;
}
