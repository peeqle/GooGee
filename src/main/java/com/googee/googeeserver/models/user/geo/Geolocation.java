package com.googee.googeeserver.models.user.geo;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Geolocation implements Serializable {
	@Id
	private String id;

	private String username;

	private GeolocationCoordinates coords;

	private long timestamp;
}
