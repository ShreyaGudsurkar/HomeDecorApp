package com.src.homedecorbackend.service;

import com.src.homedecorbackend.model.HomeDecorUser;
import com.src.homedecorbackend.model.UserDatabase;
import com.src.homedecorbackend.repository.UserRepository;
import com.src.homedecorbackend.validation.ValidationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ValidationStrategy validationStrategy;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository,
                       ValidationStrategy validationStrategy,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.validationStrategy = validationStrategy;
        this.passwordEncoder = passwordEncoder;
    }


    public HomeDecorUser saveUser(HomeDecorUser user) {

        if (!validationStrategy.validate(user)) {
            throw new IllegalArgumentException("User validation failed");
        }

        UserDatabase userDatabase = UserDatabase.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUserName())
                .userId(user.getId())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();

        userRepository.save(userDatabase);
        return user;
    }


    public HomeDecorUser getUserById(String id) {
        UserDatabase userDatabase = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return HomeDecorUser.builder()
                .firstName(userDatabase.getFirstName())
                .userName(userDatabase.getUsername())
                .id(userDatabase.getUserId())
                .lastName(userDatabase.getLastName())
                .email(userDatabase.getEmail())
                .password(userDatabase.getPassword())
                .build();
    }


    public boolean loginUser(String username, String rawPassword) {
        Optional<UserDatabase> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            UserDatabase user = userOptional.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }

        return false;
    }
}
