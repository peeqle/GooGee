package com.googee.googeeserver.models.user;

import lombok.Data;

import java.io.Serializable;

@Data
public class AppUserAdditionalInfo implements Serializable {

	private int eventsVisited = 0;
}
