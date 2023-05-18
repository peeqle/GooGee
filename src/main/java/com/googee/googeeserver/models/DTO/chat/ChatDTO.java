package com.googee.googeeserver.models.DTO.chat;

import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO extends Response {

	private String chatName;

	private AppUser creatorUser;

	private Long createdAt;
}
