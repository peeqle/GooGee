package com.googee.googeeserver.models.user.geo;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.data.geo.Point;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class GeolocationCoordinates implements Serializable {
	private Double accuracy = 0.0;

	Point location;

	private Double speed = 0.0;
}
