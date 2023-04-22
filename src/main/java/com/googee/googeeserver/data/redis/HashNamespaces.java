package com.googee.googeeserver.data.redis;

import lombok.Getter;

@Getter
public enum HashNamespaces {

    CHAT_HASH(1,"CHATS"),
    ROOM_HASH(2,"ROOMS");

    private int index;

    private String name;

    HashNamespaces(int index, String name) {
        this.index = index;
        this.name = name;
    }
}
