package com.googee.googeeserver.models.user.geo;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class GeolocationCoordinates implements Serializable {
	private Double accuracy = 0.0;

	private Double latitude = 0.0;

	private Double longitude = 0.0;

	private Double speed = 0.0;
}
