package com.googee.googeeserver.data.service.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class GeolocationServiceTest {

	@Mock
	private GeolocationService geolocationService;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}
	@Test
	public void testFoundExistingUserInLocation() {
		String username = "AAAAAAAAAAAAAAAAAA";
		boolean exist = geolocationService.existsByUsername(username);
		assertEquals(false, exist);
	}
}
