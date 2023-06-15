package com.googee.googeeserver.data.service.user;

import com.googee.googeeserver.data.repo.mongo.location.AppUserLocationRepository;
import com.googee.googeeserver.models.room.Room;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.Geolocation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class GeolocationService {
	private RabbitTemplate rabbitTemplate;

	private final MongoTemplate mongoTemplate;

	private final SimpMessagingTemplate simpMessagingTemplate;

	private final AppUserLocationRepository userLocationRepository;

	private final HashOperations<String, String, Geolocation> geolocationHashOperations;

	public void updateLocationDataForUser(Geolocation geolocation) {
		boolean exists = existsByUsername(geolocation.getUsername());
		if (exists) {
			Geolocation prev = userLocationRepository.findFirstByUsername(geolocation.getUsername());
			prev.setCoords(geolocation.getCoords());
			prev.setTimestamp(geolocation.getTimestamp());
			Query query = new Query(Criteria.where("username").is(geolocation.getUsername()));
			Update update = new Update()
				.set("coords", geolocation.getCoords())
				.set("timestamp", geolocation.getTimestamp());
			mongoTemplate.updateFirst(query, update, Geolocation.class);
		} else {
			userLocationRepository.save(geolocation);
		}
	}

	public boolean existsByUsername(String username) {
		Query query = new Query(Criteria.where("username").is(username));
		return mongoTemplate.findOne(query, Geolocation.class) != null;
	}

	public List<Geolocation> fetchUsersLocation(Collection<AppUser> users) {
		List<String> usernames = users.stream().map(AppUser::getUsername).toList();
		return userLocationRepository.findByUsernameIn(usernames);
	}

	public Geolocation fetchUserLocation(String username) {
		return userLocationRepository.findByUsername(username);
	}
}
