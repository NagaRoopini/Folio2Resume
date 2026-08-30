package com.portfolio.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private final Map<String, String> otpMap = new HashMap<>();

    public String generate(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpMap.put(email, otp);
        return otp;
    }

    public boolean verify(String email, String otp) {
        return otp.equals(otpMap.get(email));
    }
}
