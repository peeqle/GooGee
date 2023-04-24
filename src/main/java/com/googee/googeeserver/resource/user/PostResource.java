package com.googee.googeeserver.resource.user;

import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/posts")
@RequiredArgsConstructor
public class PostResource {

	@GetMapping("/fetch")
	public void fetch(@RequestParam(value = "userId") Long userId,
					  @RequestParam("offset") int offset,
					  @RequestParam("limit") int limit) {

	}

	@PostMapping("/post")
	public void post(@RequestParam(value = "userId") Long userId) {

	}
}
