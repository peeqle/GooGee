package com.googee.googeeserver.models.DTO.chat;

import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {

	private String chatName;

	@ManyToOne
	@JoinColumn(name = "creator_id")
	private AppUser creatorUser;

	private Long createdAt;

	@ElementCollection
	private Set<AppUser> members;
}
