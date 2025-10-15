package com.klef.cicd.lab.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "clothes_table")
public class Clothes {

    @Id
    // Removed @GeneratedValue — now ID is entered manually
    private int id;

    private String clothName;
    private String clothType;      // e.g., Shirt, Pants, Saree
    private double price;
    private String size;           // e.g., "M", "L", "XL"
    private String description;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getClothName() {
        return clothName;
    }
    public void setClothName(String clothName) {
        this.clothName = clothName;
    }

    public String getClothType() {
        return clothType;
    }
    public void setClothType(String clothType) {
        this.clothType = clothType;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }
    public void setSize(String size) {
        this.size = size;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
