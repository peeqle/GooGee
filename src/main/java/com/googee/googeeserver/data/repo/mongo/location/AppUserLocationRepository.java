package com.googee.googeeserver.data.repo.mongo.location;

import com.googee.googeeserver.models.user.geo.Geolocation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface AppUserLocationRepository extends MongoRepository<Geolocation, String> {

	Geolocation findFirstByUsername(String username);

	List<Geolocation> findByUsernameIn(Collection<String> usernames);

	Geolocation findByUsername(String username);
}
