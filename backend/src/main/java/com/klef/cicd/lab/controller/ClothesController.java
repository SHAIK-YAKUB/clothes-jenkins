package com.klef.cicd.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.cicd.lab.entity.Clothes;
import com.klef.cicd.lab.service.ClothesService;

@RestController
@RequestMapping("/clothesapi/")
@CrossOrigin(origins = "*")
public class ClothesController {

    @Autowired
    private ClothesService clothesService;

    @GetMapping("/")
    public String home() {
        return "Clothes Order API Running Successfully";
    }

    // Add Clothes
    @PostMapping("/add")
    public ResponseEntity<Clothes> addClothes(@RequestBody Clothes clothes) {
        Clothes savedClothes = clothesService.addClothes(clothes);
        return new ResponseEntity<>(savedClothes, HttpStatus.CREATED);
    }

    // Get All Clothes
    @GetMapping("/all")
    public ResponseEntity<List<Clothes>> getAllClothes() {
        List<Clothes> clothesList = clothesService.getAllClothes();
        return new ResponseEntity<>(clothesList, HttpStatus.OK);
    }

    // Get Clothes by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getClothesById(@PathVariable int id) {
        Clothes clothes = clothesService.getClothesById(id);
        if (clothes != null) {
            return new ResponseEntity<>(clothes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Clothes record with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Update Clothes
    @PutMapping("/update")
    public ResponseEntity<?> updateClothes(@RequestBody Clothes clothes) {
        Clothes existing = clothesService.getClothesById(clothes.getId());
        if (existing != null) {
            Clothes updatedClothes = clothesService.updateClothes(clothes);
            return new ResponseEntity<>(updatedClothes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Clothes record with ID " + clothes.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete Clothes by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClothes(@PathVariable int id) {
        Clothes existing = clothesService.getClothesById(id);
        if (existing != null) {
            clothesService.deleteClothesById(id);
            return new ResponseEntity<>("Clothes record with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Clothes record with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
