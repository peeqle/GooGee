package com.googee.googeeserver.resource.handling;

import lombok.Getter;

@Getter
public enum ErrorStatus {
    TOKEN_NOT_VALID(111),
    TOKEN_EXPIRED(112),
    TOKEN_NOT_FOUND(113),
    USER_NOT_FOUND(211);

    private int statusCode;

    ErrorStatus(int statusCode) {
        this.statusCode = statusCode;
    }
}
