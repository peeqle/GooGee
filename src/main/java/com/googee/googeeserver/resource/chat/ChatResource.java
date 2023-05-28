package com.googee.googeeserver.resource.chat;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.chat.ChatService;
import com.googee.googeeserver.data.service.message.MessageService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.DTO.chat.ChatDTO;
import com.googee.googeeserver.models.DTO.user.AppUserDTO;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.chat.ChatMessage;
import com.googee.googeeserver.models.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatResource {

	private final ChatService chatService;

	private final MessageService messageService;

	private final AppUserServiceImpl appUserService;

	private final SecurityContextService securityContextService;

	@GetMapping("/fetch")
	public ResponseEntity<List<ChatDTO>> fetchUserChats(@RequestParam("page") int pageOffset, @RequestParam("limit") int pageLimit) {

		List<Chat> chats = chatService.fetchChatsForUser(pageOffset, pageLimit).getContent();
		List<ChatDTO> result = new ArrayList<>();
		for (Chat chat : chats) {
			result.add(mapChat(chat));
		}

		return ResponseEntity.ok(result);
	}

	@PostMapping("/create")
	public ResponseEntity<ChatDTO> createNewChat(@RequestParam("chatName") String chatName) {
		AppUser creatorUser = securityContextService.fetchCurrentUser();
		Chat chat = Chat.builder()
			.chatName(chatName)
			.createdAt(Instant.now().toEpochMilli())
			.members(List.of(creatorUser))
			.build();

		if (chatService.save(chat) != null) {
			return ResponseEntity.ok(ChatDTO.builder()
				.chatName(chatName).createdAt(Instant.now().toEpochMilli()).build());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/create/room")
	public ResponseEntity<?> createNewRoom(@RequestBody AppUserDTO appUserDTO) {
		AppUser appUser = securityContextService.fetchCurrentUser();

		AppUser participant = appUserService.tryGetAppUserById(appUserDTO.getId());
		if (participant != null) {
			Chat chat = Chat.builder()
				.chatName(participant.getUsername())
				.createdAt(Instant.now().toEpochMilli())
				.privateRoom(true)
				.members(List.of(new AppUser(appUser.getId(), appUser.getUsername()), new AppUser(participant.getId(), participant.getUsername())))
				.build();
			ChatDTO result = mapChat(chatService.save(chat));

			result.setMembers(List.of(AppUser.mapToDTO(appUser), AppUser.mapToDTO(participant)));
			result.setMemberUsernames(List.of(appUser.getUsername(), participant.getUsername()));
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@GetMapping("/fetch/messages")
	public ResponseEntity<Page<ChatMessage>> fetchChatMessages(@RequestParam("chatId") String chatId,
															   @RequestParam(value = "page", defaultValue = "0") int page,
															   @RequestParam(value = "limit", defaultValue = "30") int limit,
															   @RequestParam(value = "filter", required = false) String filters) {
		if (chatId == null || chatId.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		try {
			UUID chatUUID = UUID.fromString(chatId);
			if (!chatService.exists(chatUUID)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
			Chat chat = chatService.fetchChat(chatUUID);
//todo check access

			return ResponseEntity.ok(messageService.fetchChatMessages(chatId, page, limit));
		} catch (IllegalArgumentException | NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	public ChatDTO mapChat(Chat chat) {
		return ChatDTO.builder()
			.chatId(chat.getUuid().toString())
			.chatName(chat.getChatName())
			.createdAt(chat.getCreatedAt())
			.privateRoom(chat.isPrivateRoom())
			.members(chat.getMembers().stream().map(user ->
					AppUserDTO.builder()
						.id(user.getId())
						.username(user.getUsername())
						.imageKey(user.getImageKey())
						.success(true).build())
				.toList())
			.memberUsernames(chat.getMembers().stream().map(AppUser::getUsername).toList())
			.build();
	}
}
