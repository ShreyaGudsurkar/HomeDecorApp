package com.src.homedecorbackend.model;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Builder
public class UserDatabase {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
