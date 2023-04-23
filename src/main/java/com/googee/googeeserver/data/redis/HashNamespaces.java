package com.googee.googeeserver.data.redis;

import lombok.Getter;

@Getter
public enum HashNamespaces {

	CHAT_HASH(1, "CHATS"),
	ROOM_HASH(2, "ROOMS"),
	IMAGE_HASH(3, "IMAGES"),
	LOGGER_HASH(4, "LOGGER");

	private int index;

	private String name;

	HashNamespaces(int index, String name) {
		this.index = index;
		this.name = name;
	}
}
