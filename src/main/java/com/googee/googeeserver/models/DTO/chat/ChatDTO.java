package com.googee.googeeserver.models.DTO.chat;

import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.request.Response;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO extends Response {

	private String chatId;

	private String chatName;

	private List<AppUserDTO> members = new ArrayList<>();

	private List<String> memberUsernames = new ArrayList<>();

	private Long createdAt;

	private boolean privateRoom = false;

	private String imageKey;
}
