package com.src.homedecorbackend.controller;

import com.src.homedecorbackend.model.HomeDecorUser;
import com.src.homedecorbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getHomeDecorUser/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HomeDecorUser getHomeDecorUserById(@PathVariable("id")  String id) {
        log.info("Fetching HomeDecorUser with id: {}", id);
        // Retrieve user from database
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public HomeDecorUser createHomeDecorUser(@RequestBody HomeDecorUser user) {
        user.setId(UUID.randomUUID().toString());
        log.info("Creating HomeDecorUser with id: {}", user.getUserName());
        return userService.saveUser(user);
    }
}
