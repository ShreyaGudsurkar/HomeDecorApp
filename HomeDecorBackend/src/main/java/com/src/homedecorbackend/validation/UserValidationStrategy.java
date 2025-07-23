package com.src.homedecorbackend.validation;

import com.src.homedecorbackend.model.HomeDecorUser;
import org.springframework.stereotype.Service;
import com.src.homedecorbackend.model.UserDatabase;


@Service
public class UserValidationStrategy implements ValidationStrategy {

    @Override
    public boolean validate(Object input) {
        HomeDecorUser homeDecorUser = (HomeDecorUser) input;

        if (!isValidName(homeDecorUser)) {
            throw new IllegalArgumentException("Invalid name");
        }

        if (!isValidUsername(homeDecorUser.getUserName())) {
            throw new IllegalArgumentException("Invalid username");
        }
        if (!isValidPassword(homeDecorUser.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        if (!isValidEmail(homeDecorUser.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }
        return true;
    }

    private boolean isValidUsername(String username) {
        return username != null && username.matches("^[A-Za-z]\\w{5,29}$");
    }

    private boolean isValidName(HomeDecorUser homeDecorUser) {
        boolean isValidFirstName= homeDecorUser.getFirstName() != null
                && homeDecorUser.getFirstName()
                .matches("^[A-Za-z ]{1,50}$");

        boolean isValidLastName= homeDecorUser.getLastName() != null
                && homeDecorUser.getLastName()
                .matches("^[A-Za-z ]{1,50}$");
        return isValidFirstName && isValidLastName;

    }

    private boolean isValidEmail(String email) {
        return email != null && email
                .matches("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)" +
                        "*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,7})$");
    }
    private boolean isValidPassword(String password) {
        return password != null && password.matches
                ("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])" +
                        "(?=.*[@#$%^&*])[A-Za-z0-9@#$%^&*]{8,20}$");
    }
}