package com.mikolowski.maciej.wsb.Fakebook.dao;

import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDto, String> {

    Optional<UserDto> findFirstByLoginAndPassword(String login, String password);

    Optional<UserDto> findFirstByLogin(String login);
}
