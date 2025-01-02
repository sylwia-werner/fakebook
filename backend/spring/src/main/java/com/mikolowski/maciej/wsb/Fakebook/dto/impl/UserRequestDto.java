package com.mikolowski.maciej.wsb.Fakebook.dto.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto extends User {

    @NotNull
    protected String login;

    @NotNull
    protected String password;
}
