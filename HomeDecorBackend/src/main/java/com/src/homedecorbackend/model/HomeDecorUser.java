package com.src.homedecorbackend.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Builder
public class HomeDecorUser {

    @Id
    private String id;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
