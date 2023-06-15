package com.googee.googeeserver.models.chat;

import ch.qos.logback.core.status.InfoStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
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
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	private String chatName;

	private Long createdAt = Instant.now().toEpochMilli();

	private String imageKey;

	private boolean privateRoom = true;

	@Cascade(CascadeType.ALL)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "chat_members", joinColumns = @JoinColumn(name = "id"))
	private List<AppUser> members = new ArrayList<>();
}
