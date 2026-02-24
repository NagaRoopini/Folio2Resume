package com.portfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.repository.UserRepository;
import com.portfolio.service.EmailService;
import com.portfolio.service.OtpService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;

    public ForgotPasswordController(UserRepository userRepository,
                                    OtpService otpService,
                                    EmailService emailService) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String email) {

        if (userRepository.findByEmail(email).isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Email not registered");
        }

        String otp = otpService.generate(email);
        try {
            emailService.sendOtp(email, otp);
            return ResponseEntity.ok("OTP sent");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send email. Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email,
                                       @RequestParam String otp) {

        boolean valid = otpService.verify(email, otp);
        return ResponseEntity.ok(valid);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email,
                                           @RequestParam String newPassword) {
        return userRepository.findByEmail(email).map(user -> {
            user.setPassword(newPassword);
            userRepository.save(user);
            return ResponseEntity.ok("Password reset successful");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
