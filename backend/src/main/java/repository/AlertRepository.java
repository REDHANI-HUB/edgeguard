package com.example.edgeguard.repository;

import com.example.edgeguard.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}