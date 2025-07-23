package com.src.homedecorbackend.controller;

import com.src.homedecorbackend.dto.PaymentRequest;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest request) {
        try {
            log.info("Received PaymentRequest: {}", request);

            if (request.getAmount() == null || request.getAmount() <= 0) {
                throw new IllegalArgumentException("Invalid or missing amount in request");
            }

            String productName = request.getProductId();
            Long price = request.getAmount();

            log.info("Creating Stripe session for '{}', amount: {}", productName, price);

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/#store-success?product=" +
                            URLEncoder.encode(productName, StandardCharsets.UTF_8) +
                            "&amount=" + URLEncoder.encode(String.valueOf(price), StandardCharsets.UTF_8)
                    )
                    .setCancelUrl("http://localhost:5173/#store-cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(price)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(productName)
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);
            Map<String, String> response = new HashMap<>();
            response.put("id", session.getId());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Stripe session creation failed", e);
            throw new RuntimeException("Unable to create Stripe Checkout Session");
        }
    }

}
