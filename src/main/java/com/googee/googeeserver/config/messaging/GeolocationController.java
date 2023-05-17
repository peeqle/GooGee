package com.googee.googeeserver.config.messaging;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.service.user.AppUserServiceImpl;
import com.googee.googeeserver.data.service.user.GeolocationService;
import com.googee.googeeserver.models.user.geo.Geolocation;
import com.googee.googeeserver.models.user.geo.GeolocationCoordinates;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Log4j2
@Controller
@RequiredArgsConstructor
public class GeolocationController {

	private final static String GEO_UPDATE_MAPPING = "/topic/geolocation.update";

	private final SecurityContextService securityContextService;

	private final GeolocationService geolocationService;

	private final AppUserServiceImpl appUserService;

	private final Gson gson = new GsonBuilder().create();

	@MessageMapping(GEO_UPDATE_MAPPING)
	public void updateUserGeolocation(@Header("currentLocation") String currentLocation, @Header("username") String username) {
		GeolocationCoordinates geolocationCoordinates = gson.fromJson(currentLocation, GeolocationCoordinates.class);

		Geolocation geolocation = Geolocation.builder()
			.username(username)
			.coords(geolocationCoordinates)
			.timestamp(Instant.now().toEpochMilli())
			.build();

		geolocationService.updateLocationDataForUser(geolocation, username);
	}
}
