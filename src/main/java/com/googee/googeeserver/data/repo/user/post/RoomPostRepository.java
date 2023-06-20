package com.googee.googeeserver.data.repo.user.post;

import com.googee.googeeserver.models.post.RoomPost;
import com.googee.googeeserver.models.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomPostRepository extends JpaRepository<RoomPost, Long> {

	List<RoomPost> findAllByRoom(Room room);
}
