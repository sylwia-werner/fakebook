package com.mikolowski.maciej.wsb.Fakebook.dto.impl;

import com.mikolowski.maciej.wsb.Fakebook.dto.IUser;
import com.mikolowski.maciej.wsb.Fakebook.dto.IUserRegister;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDto extends UserRequestDto implements IUser, IUserRegister {

    @NotNull
    private String password2;

    @Override
    public boolean arePasswordsEqual() {
        return StringUtils.equals(password2, password);
    }
}
