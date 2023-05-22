package com.googee.googeeserver.models.room;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
public class RoomOptions implements Serializable {

	@Serial
	private final static long serialVersionUID = 6529685098267757690L;

	private String roomImagePath = "";
}
