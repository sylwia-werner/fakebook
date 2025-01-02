package com.mikolowski.maciej.wsb.Fakebook.service;

import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserDto;
import io.jsonwebtoken.Claims;

public interface IJWTService {

    boolean isActual(String jwtToken);
    String getUuid(String jwtToken);
    Claims parseToken(String jwtToken);
    String generateToken(UserDto user);

    String hashUuid(String uuid);

}
