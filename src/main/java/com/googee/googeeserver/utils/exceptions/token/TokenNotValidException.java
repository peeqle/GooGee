package com.googee.googeeserver.utils.exceptions.token;

public class TokenNotValidException extends Exception{
    public TokenNotValidException() {
        super();
    }

    public TokenNotValidException(String message) {
        super(message);
    }
}
