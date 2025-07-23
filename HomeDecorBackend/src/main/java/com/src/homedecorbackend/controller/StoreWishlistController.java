package com.src.homedecorbackend.controller;

import com.src.homedecorbackend.model.WishlistItem;
import com.src.homedecorbackend.repository.StoreWishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/store-wishlist")
@RequiredArgsConstructor
public class StoreWishlistController {

    private final StoreWishlistRepository wishlistRepo;

    @GetMapping("/{username}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable String username) {
        List<WishlistItem> wishlist = wishlistRepo.findByUsername(username);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping
    public ResponseEntity<?> addToWishlist(@RequestBody WishlistItem item) {
        boolean exists = wishlistRepo.existsByUsernameAndProductId(item.getUsername(), item.getProductId());
        if (exists) {
            return ResponseEntity.badRequest().body("Item already in wishlist");
        }
        WishlistItem savedItem = wishlistRepo.save(item);
        return ResponseEntity.ok(savedItem);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromWishlist(
            @RequestParam String username,
            @RequestParam String productId) {
        wishlistRepo.deleteByUsernameAndProductId(username, productId);
        return ResponseEntity.noContent().build();
    }

}
