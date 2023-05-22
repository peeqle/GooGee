package com.googee.googeeserver.data.service;

import lombok.Getter;

@Getter
public enum KeyStorage {
	GEOLOCATION(1, "GEO"),
	MEDIA(2, "MEDIA");

	private final int index;

	private final String tag;

	KeyStorage(int index, String tag) {
		this.tag = tag;
		this.index = index;
	}
}
