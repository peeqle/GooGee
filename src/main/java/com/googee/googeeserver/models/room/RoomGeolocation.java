package com.googee.googeeserver.models.room;

import com.googee.googeeserver.models.user.geo.GeolocationCoordinates;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document
@AllArgsConstructor
@NoArgsConstructor
public class RoomGeolocation {
	@Id
	String id;

	String roomUUID;

	GeolocationCoordinates coords;

	Long timestamp;
}
