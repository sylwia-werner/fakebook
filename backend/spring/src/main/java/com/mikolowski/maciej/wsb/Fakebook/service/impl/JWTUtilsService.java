package com.mikolowski.maciej.wsb.Fakebook.service.impl;

import com.mikolowski.maciej.wsb.Fakebook.dto.impl.UserDto;
import com.mikolowski.maciej.wsb.Fakebook.service.IJWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.util.Date;

public class JWTUtilsService implements IJWTService {

    private final SecretKey key;

    @Value("${shared.key}")
    private String sharedKey;

    public JWTUtilsService() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    @Override
    public String generateToken(UserDto user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getUuid()))
                .claim("role", "user")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(key)
                .compact();
    }

    @Override
    public Claims parseToken(String jwtToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (SignatureException ex) {
            return null;
        }
    }

    @Override
    public String getUuid(String jwtToken) {
        Claims claims = parseToken(jwtToken);
        return claims != null ? claims.getSubject() : null;
    }

    @Override
    public boolean isActual(String jwtToken) {
        Claims claims = parseToken(jwtToken);
        return claims != null && claims.getExpiration().after(new Date());
    }

    @Override
    public String hashUuid(String uuid) {
        return Jwts.builder()
                .setSubject(uuid)
                .signWith(Keys.hmacShaKeyFor("tajny_kod_dzilimy_go_z_api_Spring".getBytes()))
                .compact();

    }
}
