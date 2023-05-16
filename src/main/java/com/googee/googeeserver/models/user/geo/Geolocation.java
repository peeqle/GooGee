package com.googee.googeeserver.models.user.geo;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class Geolocation implements Serializable {
	private String username;

	private GeolocationCoordinates coords;

	private long timestamp;
}
