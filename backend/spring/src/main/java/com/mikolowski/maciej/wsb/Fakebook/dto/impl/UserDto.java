package com.mikolowski.maciej.wsb.Fakebook.dto.impl;

import com.mikolowski.maciej.wsb.Fakebook.dto.IUser;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "member")
public class UserDto implements IUser {

    public UserDto(UserRequestDto userRequestDto) {
        this.login = userRequestDto.getLogin();
        this.password = userRequestDto.getPassword();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    @NotNull
    private String login;

    @NotNull
    private String password;
}
