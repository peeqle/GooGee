package com.googee.googeeserver.data.service.user.post;

import com.googee.googeeserver.data.repo.user.post.PostRepository;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.Post;
import com.googee.googeeserver.utils.exceptions.post.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.plaf.SpinnerUI;

@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;

	public Page<Post> fetch(int limit, int offset, AppUser appUser) {
		Pageable pageable = PageRequest.of(offset, limit);
		return postRepository.getPostsByCreatorUserOrderByCreatedAtDesc(appUser, pageable);
	}

	public Post fetchPostById(Long id) throws PostNotFoundException {
		return this.postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post not found " + id));
	}

	public Post save(Post post) {
		return postRepository.save(post);
	}
}
