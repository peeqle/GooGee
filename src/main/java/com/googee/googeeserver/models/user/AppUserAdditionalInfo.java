package com.googee.googeeserver.models.user;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class AppUserAdditionalInfo implements Serializable {
	@Serial
	private static final long serialVersionUID = 36427862384623764L;

	private int eventsVisited = 0;

	private Double maxEventDistance = 20000.0;
}
