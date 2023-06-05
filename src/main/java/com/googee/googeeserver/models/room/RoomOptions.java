package com.googee.googeeserver.models.room;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
public class RoomOptions implements Serializable {

	@Serial
	private final static long serialVersionUID = 6529685098267757690L;

	private String roomImageKey = "";

	private boolean connectedToLocation = false;

	private boolean chatEnabled = true;

	private boolean opened = true;

	private boolean createChatRoomCreate = true;
}
