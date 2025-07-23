package com.src.homedecorbackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "catalog")
public class Product {

    @Id
    private String id;

    private String mainCategory;
    private String subCategory;
    private String type;

    private String imageUrl;
    private String localFile;
    private String source;
    private String licenseUrl;

    private int priceUsd;
    private Integer originalPriceUsd;
    private Double rating;
    private String emiInfo;
    private String shippingInfo;

    private boolean generated;
}
