package com.klef.cicd.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.cicd.lab.entity.Clothes;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
    Clothes findByClothName(String clothName);
}
