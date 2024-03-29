package com.googee.googeeserver.models.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googee.googeeserver.models.user.AppUser;
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
	@JsonIgnore
	public AppUser creatorUser;

	@ManyToOne
	@JoinColumn(name = "target_id")
	@JsonIgnore
	public AppUser targetUser;

	private Long createdAt = Instant.now().toEpochMilli();
}

