package com.src.homedecorbackend.repository;

import com.src.homedecorbackend.model.WishlistItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StoreWishlistRepository extends MongoRepository<WishlistItem, String> {
    List<WishlistItem> findByUsername(String username);
    Optional<WishlistItem> findByUsernameAndProductId(String username, String productId);
    void deleteByUsernameAndProductId(String username, String productId);
    boolean existsByUsernameAndProductId(String username, String productId);
}
