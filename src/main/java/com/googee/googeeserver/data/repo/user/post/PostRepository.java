package com.googee.googeeserver.data.repo.user.post;

import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> getPostsByCreatorUserOrderByCreatedAtDesc(AppUser creatorUser, Pageable pageable);

	List<Post> getPostsByCreatorUserOrderByCreatedAtDesc(AppUser creatorUser);
}
