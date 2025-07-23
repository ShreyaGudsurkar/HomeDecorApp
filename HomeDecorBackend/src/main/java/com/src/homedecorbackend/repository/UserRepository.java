package com.src.homedecorbackend.repository;

import com.src.homedecorbackend.model.UserDatabase;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDatabase, String> {
    Optional<UserDatabase> findById(String id);
    Optional<UserDatabase> findByUsername(String username);

    UserDatabase save(UserDatabase user);
}
