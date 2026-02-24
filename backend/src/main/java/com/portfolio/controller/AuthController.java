package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.entity.User;
import com.portfolio.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository repo;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("User already registered");
        }

        repo.save(user);
        return ResponseEntity.ok("Registration successful");
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User req) {

        return repo.findByEmail(req.getEmail())
                .filter(u -> u.getPassword().equals(req.getPassword()))
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(u))
                .orElse(
                    ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password")
                );
    }
    // ✅ GET USER BY ID
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return repo.findById(id)
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(u))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    // ✅ UPDATE PROFILE (NAME)
    @PostMapping("/update-profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody User req) {
        return repo.findById(id).map(user -> {
            user.setName(req.getName());
            repo.save(user);
            return ResponseEntity.ok("Profile updated");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    // ✅ CHANGE PASSWORD
    @PostMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody java.util.Map<String, String> req) {
        return repo.findById(id).map(user -> {
            String oldPass = req.get("oldPassword");
            String newPass = req.get("newPassword");
            
            if (!user.getPassword().equals(oldPass)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect old password");
            }
            
            user.setPassword(newPass);
            repo.save(user);
            return ResponseEntity.ok("Password changed");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    // ✅ DELETE ACCOUNT
    @PostMapping("/delete-account/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id, @RequestBody java.util.Map<String, String> req) {
        return repo.findById(id).map(user -> {
            String pass = req.get("password");
            if (!user.getPassword().equals(pass)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
            }
            repo.delete(user);
            return ResponseEntity.ok("Account deleted");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
