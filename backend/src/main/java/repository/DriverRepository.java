package com.example.edgeguard.repository;

import com.example.edgeguard.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
}