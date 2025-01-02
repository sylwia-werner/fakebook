package com.mikolowski.maciej.wsb.Fakebook.service.impl;

import com.mikolowski.maciej.wsb.Fakebook.service.IUserService;
import com.mikolowski.maciej.wsb.Fakebook.service.IJWTService;
import com.mikolowski.maciej.wsb.Fakebook.utils.Md5HashUtils;
import com.mikolowski.maciej.wsb.Fakebook.dao.UserRepository;
import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserDto;
import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserRequestDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    private IJWTService jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Override
    public void setJwtService(JWTUtilsService jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean isUserExisting(String uuid) {
        return userRepository.existsById(uuid);
    }

    @Override
    public ResponseEntity<String> login(UserRequestDto user) {
        String hashedPassword = Md5HashUtils.hashPassword(user.getPassword());
        Optional<UserDto> found = userRepository.findFirstByLoginAndPassword(user.getLogin(), hashedPassword);
        return generateTokenForFoundUser(found);
    }

    @Override
    public ResponseEntity<Boolean> register(UserRequestDto user) {
        UserDto userToSave = new UserDto(user);
        Optional<UserDto> existingUser = userRepository.findFirstByLogin(user.getLogin());
        if (existingUser.isEmpty()) {
            String hashedPassword = Md5HashUtils.hashPassword(userToSave.getPassword());
            userToSave.setPassword(hashedPassword);
            UserDto saved = userRepository.save(userToSave);
            if (StringUtils.isNotEmpty(saved.getUuid())) {
                return new ResponseEntity<>(Boolean.TRUE, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(Boolean.FALSE, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(Boolean.FALSE, HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public ResponseEntity<String> generateTokenForUuid(String uuid) {
        Optional<UserDto> found = userRepository.findById(uuid);
        return generateTokenForFoundUser(found);
    }

    public ResponseEntity<String> checkToken(String bearerToken) {
        String jwtToken = bearerToken.replace("Bearer ", StringUtils.EMPTY);
        String uuid = jwtUtils.getUuid(jwtToken);
        if (StringUtils.isNotEmpty(uuid) && isUserExisting(uuid)) {
            boolean isValid = jwtUtils.isActual(jwtToken);
            if (isValid) {
                return new ResponseEntity<>(jwtUtils.hashUuid(uuid), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("", HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
    }

    private ResponseEntity<String> generateTokenForFoundUser(Optional<UserDto> found) {
        return found.map(userDto -> new ResponseEntity<>(jwtUtils.generateToken(userDto), HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(StringUtils.EMPTY, HttpStatus.NOT_FOUND));
    }
}
