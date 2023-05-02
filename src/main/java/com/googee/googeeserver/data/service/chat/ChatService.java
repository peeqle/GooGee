package com.googee.googeeserver.data.service.chat;

import com.googee.googeeserver.config.security.UserContextService;
import com.googee.googeeserver.data.redis.HashNamespaces;
import com.googee.googeeserver.data.redis.HashNamespaces.*;
import com.googee.googeeserver.data.repo.chat.ChatRepository;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.utils.exceptions.ChatAlreadyExists;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;

import static java.lang.String.format;
import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final ChatRepository chatRepository;

	private final AppUserServiceImpl appUserService;

	private final UserContextService userContextService;

	public Chat save(Chat chat) {
		return chatRepository.save(chat);
	}

	public Page<Chat> fetchChatsForUser(int page, int limit) {
		Pageable pageable = PageRequest.of(page, limit);

		Long appUserId = userContextService.getCurrentUserId();

		AppUser appUser = appUserService.tryGetAppUserById(appUserId);

		if(isNull(appUser)) {
			return Page.empty();
		}

		return chatRepository.getChatsByMembersContains(appUser, pageable);
	}
}
