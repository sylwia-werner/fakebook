package com.mikolowski.maciej.wsb.Fakebook.service;

import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserRequestDto;
import com.mikolowski.maciej.wsb.Fakebook.service.impl.JWTUtilsService;
import org.springframework.http.ResponseEntity;

public interface IUserService {

    void setJwtService(JWTUtilsService jwtUtils);
    boolean isUserExisting(String uuid);
    ResponseEntity<String> login(UserRequestDto user);
    ResponseEntity<String> register(UserRequestDto user);
    ResponseEntity<String> generateTokenForUuid(String uuid);
    ResponseEntity<String> checkToken(String token);
}
