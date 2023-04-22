package com.googee.googeeserver.utils.exceptions;

public class ChatAlreadyExists extends Exception {
    public ChatAlreadyExists(String message, Throwable cause) {
        super(message, cause);
    }

    public ChatAlreadyExists(String message) {
        super(message);
    }
}
