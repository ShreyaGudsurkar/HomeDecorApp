package com.src.homedecorbackend.controller;

import com.src.homedecorbackend.model.Product;
import com.src.homedecorbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @GetMapping("/main")
    public List<Product> getByMainCategory(@RequestParam String main) {
        return productRepository.findByMainCategory(main);
    }

    @GetMapping("/sub")
    public List<Product> getBySubCategory(@RequestParam String sub) {
        return productRepository.findBySubCategory(sub);
    }

    @GetMapping("/type")
    public List<Product> getByType(@RequestParam String type) {
        return productRepository.findByTypeContainingIgnoreCase(type);
    }

    @GetMapping("/combo")
    public List<Product> getByMainAndSub(@RequestParam String main,
                                         @RequestParam String sub) {
        return productRepository.findByMainCategoryAndSubCategory(main, sub);
    }
    @GetMapping("/distinct/main")
    public List<String> getDistinctMainCategories() {
        return productRepository.findAllMainCategories().stream()
                .map(Product::getMainCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/distinct/sub")
    public List<String> getDistinctSubCategories() {
        return productRepository.findAllSubCategories().stream()
                .map(Product::getSubCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/distinct/type")
    public List<String> getDistinctTypes() {
        return productRepository.findAllTypes().stream()
                .map(Product::getType)
                .distinct()
                .collect(Collectors.toList());
    }
}
