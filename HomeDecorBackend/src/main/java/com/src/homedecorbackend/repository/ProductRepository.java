package com.src.homedecorbackend.repository;

import com.src.homedecorbackend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByMainCategory(String mainCategory);

    List<Product> findBySubCategory(String subCategory);

    List<Product> findByTypeContainingIgnoreCase(String type);

    List<Product> findByMainCategoryAndSubCategory(String mainCategory, String subCategory);

    @Query("{}")
    List<Product> findAllMainCategories();

    @Query("{}")
    List<Product> findAllSubCategories();

    @Query("{}")
    List<Product> findAllTypes();


}
