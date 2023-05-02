package com.googee.googeeserver.resource.user;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.NotificationService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.data.service.user.post.PostService;
import com.googee.googeeserver.models.DTO.user.post.PostDTO;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.Post;
import com.googee.googeeserver.utils.exceptions.post.PostNotFoundException;
import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.time.Instant;

@RestController
@RequestMapping("/api/v1/user/posts")
@RequiredArgsConstructor
public class PostResource {

	private final PostService postService;

	private final AppUserServiceImpl appUserService;

	private final NotificationService notificationService;

	private final SecurityContextService securityContextService;

	@GetMapping("/fetch")
	public void fetch(@RequestParam(value = "userId") Long userId,
					  @RequestParam("offset") int offset,
					  @RequestParam("limit") int limit) {

	}

	@PostMapping("/save")
	public ResponseEntity post(@RequestBody PostDTO postDTO) {
		if (postDTO.getContent().isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		AppUser currentUser = securityContextService.fetchCurrentUser();

		Post post = Post.builder()
			.textContent(postDTO.getContent())
			.creatorUser(currentUser)
			.createdAt(Instant.now().toEpochMilli())
			.build();
		if (postDTO.getParentPost() != null) {
			try {
				post.setParentPost(postService.fetchPostById(postDTO.getParentPost()));
			} catch (PostNotFoundException e) {
				return ResponseEntity.status(HttpStatus.GONE).build();
			}
		}

		post.setTargetUser(currentUser);

		if (postDTO.getTargetUser() != null) {
			if (!currentUser.getId().equals(postDTO.getTargetUser())) {
				AppUser targetUser = appUserService.tryGetAppUserById(postDTO.getTargetUser());
				post.setTargetUser(targetUser);
			}
		}
		//send post info to subbed users channel

		return ResponseEntity.ok().build();
	}
}
