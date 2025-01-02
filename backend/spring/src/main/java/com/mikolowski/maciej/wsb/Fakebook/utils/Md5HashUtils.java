package com.mikolowski.maciej.wsb.Fakebook.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5HashUtils {

    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");

            byte[] hashedBytes = md.digest(password.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hashedBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error: MD5 algorithm not found.", e);
        }
    }
}
