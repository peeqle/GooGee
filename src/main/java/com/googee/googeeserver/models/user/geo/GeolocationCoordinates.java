package com.googee.googeeserver.models.user.geo;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class GeolocationCoordinates implements Serializable {
	private double accuracy = 0.0;
	private double latitude = 0.0;
	private double longitude = 0.0;
	private double speed = 0.0;
}
