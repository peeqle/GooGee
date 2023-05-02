package com.googee.googeeserver.models.user;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
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
	@JoinColumn(name = "creator_id")
	public AppUser creatorUser;

	@ManyToOne
	@JoinColumn(name = "target_id")
	public AppUser targetUser;

	private Long createdAt = Instant.now().toEpochMilli();
}
