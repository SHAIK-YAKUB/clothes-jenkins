package com.klef.cicd.lab.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.lab.entity.Clothes;
import com.klef.cicd.lab.repository.ClothesRepository;

@Service
public class ClothesServiceImpl implements ClothesService {

    @Autowired
    private ClothesRepository clothesRepository;

    @Override
    public Clothes addClothes(Clothes clothes) {
        return clothesRepository.save(clothes);
    }

    @Override
    public List<Clothes> getAllClothes() {
        return clothesRepository.findAll();
    }

    @Override
    public Clothes getClothesById(int id) {
        Optional<Clothes> opt = clothesRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Clothes updateClothes(Clothes clothes) {
        return clothesRepository.save(clothes);
    }

    @Override
    public void deleteClothesById(int id) {
        clothesRepository.deleteById(id);
    }
}
