package com.googee.googeeserver.data.service.user;

import com.googee.googeeserver.data.service.KeyStorage;
import com.googee.googeeserver.models.user.geo.Geolocation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class GeolocationService {
	private RabbitTemplate rabbitTemplate;

	private final SimpMessagingTemplate simpMessagingTemplate;

	private final HashOperations<String, String, Geolocation> geolocationHashOperations;

	public void updateLocationDataForUser(Geolocation geolocation, String username) {
		geolocationHashOperations.put(KeyStorage.GEOLOCATION.getTag(), username, geolocation);
	}
}
