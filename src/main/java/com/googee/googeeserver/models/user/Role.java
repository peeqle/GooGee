package com.googee.googeeserver.models.user;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("ADMIN", "ROLE_ADMIN"),
    USER("USER", "ROLE_SUBJECT");

    private final String roleName;

    private final String roleSubject;

	Role(String roleName, String roleSubject) {
        this.roleName = roleName;

        this.roleSubject = roleSubject;
    }
}
