package com.googee.googeeserver.models.user;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "app_user_post")
public class Post implements Serializable {

	@Id
	@GeneratedValue
	private Long id;

	private String textContent;

	@ElementCollection
	private List<String> byteContentLinks = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "user_id")
	public AppUser appUser;
}
