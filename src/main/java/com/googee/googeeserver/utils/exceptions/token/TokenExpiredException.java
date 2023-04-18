package com.googee.googeeserver.utils.exceptions.token;

public class TokenExpiredException extends Exception{
    public TokenExpiredException() {
        super();
    }

    public TokenExpiredException(String message) {
        super(message);
    }
}
