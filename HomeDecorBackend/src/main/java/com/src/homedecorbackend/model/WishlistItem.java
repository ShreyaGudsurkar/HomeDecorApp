package com.src.homedecorbackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "store_wishlist")
public class WishlistItem {
    @Id
    private String id;

    private String username;
    private String productId;
    private String title;
    private String imageUrl;
    private Long priceUsd;
}
