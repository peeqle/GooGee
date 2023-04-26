package com.googee.googeeserver.models.DTO.user.post;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class PostDTO implements Serializable {

	private String content;

	private Long createdAt;

	private Long targetUser;

	private Long parentPost;
}
