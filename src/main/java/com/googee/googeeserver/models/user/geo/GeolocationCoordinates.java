package com.googee.googeeserver.models.user.geo;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class GeolocationCoordinates implements Serializable {
	private double accuracy;
	private double latitude;
	private double longitude;
	private double speed;
}
