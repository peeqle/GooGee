package com.googee.googeeserver.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.googee.googeeserver.data.service.room.RoomService;
import com.googee.googeeserver.data.service.user.post.PostService;
import com.googee.googeeserver.models.post.Post;
import com.googee.googeeserver.models.post.RoomPost;
import com.googee.googeeserver.models.room.Room;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Profile("test")
@ExtendWith(MockitoExtension.class)
class RoomResourceTest {

	@Mock
	private RoomService roomService;

	@Mock
	private PostService postService;

	@InjectMocks
	private RoomResource resource;

	private MockMvc mvc;

	@BeforeEach
	public void setup() {
		JacksonTester.initFields(this, new ObjectMapper());
		// MockMvc standalone approach
		mvc = MockMvcBuilders.standaloneSetup(resource)
			.build();
	}
	@Test
	void testSaveRoomPost_Success() {
		// Arrange
		Room room = new Room();
		UUID roomId = UUID.randomUUID();
		String postContent = RoomPost.builder().textContent("some text").build().toString();
		Post post = Post.builder().build();

		// Act
		ResponseEntity<RoomPost> response = resource.saveRoomPost(postContent, roomId.toString());

		// Assert
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@Test
	void testSaveRoomPost_RoomNotFound() {
		// Arrange
		UUID nonExistentRoomId = UUID.randomUUID();
		String postContent = "Test post content";

		when(roomService.fetchRoomById(nonExistentRoomId)).thenReturn(null);

		// Act
		ResponseEntity<RoomPost> response = resource.saveRoomPost(postContent, nonExistentRoomId.toString());

		// Assert
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@Test
	void testFetchRoomPosts_Success() {
		// Arrange
		Room room = new Room();
		UUID roomId = UUID.randomUUID();
		List<RoomPost> posts = new ArrayList<>();
		posts.add(new RoomPost());

		when(roomService.fetchRoomById(roomId)).thenReturn(room);
		when(postService.fetch(room)).thenReturn(posts);

		// Act
		ResponseEntity<List<RoomPost>> response = resource.fetchRoomPosts(roomId.toString());

		// Assert
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(posts, response.getBody());
	}
}
