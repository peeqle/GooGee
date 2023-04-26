package com.googee.googeeserver.models.user;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@RequiredArgsConstructor
@Table(name = "app_user_post")
public class Post implements Serializable {

	@Id
	@GeneratedValue
	private Long id;

	private String textContent;

	@ElementCollection
	private List<String> byteContentLinks = new ArrayList<>();

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	public Post parentPost;

	@ManyToOne
	@JoinColumn(name = "user_id")
	public AppUser appUser;

	@ManyToOne
	@JoinColumn(name = "user_id")
	public AppUser targetUser;

	private Long createdAt = Instant.now().toEpochMilli();
}
