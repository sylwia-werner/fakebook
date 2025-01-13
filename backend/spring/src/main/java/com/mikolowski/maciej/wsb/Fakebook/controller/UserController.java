package com.mikolowski.maciej.wsb.Fakebook.controller;

import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserRegisterDto;
import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserRequestDto;
import com.mikolowski.maciej.wsb.Fakebook.service.IUserService;
import com.mikolowski.maciej.wsb.Fakebook.service.impl.JWTUtilsService;
import io.sentry.Sentry;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostConstruct
    public void initialize() {
        userService.setJwtService(new JWTUtilsService());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid UserRequestDto user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegisterDto user) {
        return userService.register(user);
    }

    @GetMapping("/check-token")
    public ResponseEntity<String> checkToken(@RequestHeader("Authorization") String bearerToken) {
        return userService.checkToken(bearerToken);
    }
}
