package com.googee.googeeserver.models.DTO.user;

import com.googee.googeeserver.models.user.Role;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class AppUserDTO implements Serializable {
    private String username;

    private List<Role> roles;
}
