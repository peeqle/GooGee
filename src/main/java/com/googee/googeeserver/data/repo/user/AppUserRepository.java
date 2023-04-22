package com.googee.googeeserver.data.repo.user;

import com.googee.googeeserver.models.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findAppUserByUsername(String username);

    Optional<AppUser> findAppUserByEmail(String email);

    Optional<AppUser> findAppUserById(Long id);
}
