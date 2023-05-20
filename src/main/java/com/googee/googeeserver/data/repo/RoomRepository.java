package com.googee.googeeserver.data.repo;

import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
	Page<Room> findAllByCreatorsContaining(AppUser appUser, Pageable page);

	Page<Room> findAllByMembersContaining(AppUser appUser, Pageable page);
}
