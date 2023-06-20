package com.googee.googeeserver.models.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.hibernate.annotations.CascadeType.ALL;

@Data
@Entity
@Builder
@Table(name = "room_post")
@NoArgsConstructor
@AllArgsConstructor
public class RoomPost implements Serializable {
	@Id
	@GeneratedValue
	private Long id;
	@Column(length = 10000)
	private String textContent;

	@ManyToOne
	@Cascade(ALL)
	@JsonIgnore
	private Room room;

	@ElementCollection
	private List<String> byteContentHashes = new ArrayList<>();

	private Long createdAt = Instant.now().toEpochMilli();
}
