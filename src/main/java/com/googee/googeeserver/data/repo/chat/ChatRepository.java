package com.googee.googeeserver.data.repo.chat;

import com.googee.googeeserver.models.chat.Chat;
import com.googee.googeeserver.models.user.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {

	Page<Chat> findAllByMembersContains(AppUser appUser, Pageable pageable);
}
