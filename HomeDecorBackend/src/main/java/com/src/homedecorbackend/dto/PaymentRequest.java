package com.src.homedecorbackend.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String productId;
    private Long amount;
}

