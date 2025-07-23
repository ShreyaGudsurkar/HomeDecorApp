package com.src.homedecorbackend.controller;

import com.src.homedecorbackend.dto.LoginRequest;
import com.src.homedecorbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.loginUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        if (isAuthenticated) {
            return ResponseEntity.ok(Collections.singletonMap("username", loginRequest.getUsername()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid username or password"));

        }
    }


}
