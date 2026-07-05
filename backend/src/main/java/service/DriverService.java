package com.example.edgeguard.service;

import com.example.edgeguard.exception.ResourceNotFoundException;
import com.example.edgeguard.model.Driver;
import com.example.edgeguard.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import com.example.edgeguard.model.Alert;
import com.example.edgeguard.repository.AlertRepository;
import com.example.edgeguard.dto.DriverRiskResponse;
import java.util.ArrayList;
import java.util.Comparator;

@Service
public class DriverService {
    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private DriverRepository driverRepository;

    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver getDriverById(Long id) {

        return driverRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Driver Not Found With ID : " + id
                        ));
    }

    public Driver updateDriver(Long id, Driver updatedDriver) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Driver Not Found With ID : " + id
                        ));

        driver.setName(updatedDriver.getName());
        driver.setEmail(updatedDriver.getEmail());
        driver.setVehicleNumber(updatedDriver.getVehicleNumber());

        return driverRepository.save(driver);
    }
    public Page<Driver> getDriversPage(
            int page,
            int size) {

        return driverRepository.findAll(
                PageRequest.of(page, size)
        );
    }
    public void deleteDriver(Long id) {

        if (!driverRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Driver Not Found With ID : " + id
            );
        }

        driverRepository.deleteById(id);
    }
    public List<DriverRiskResponse> getDriverRanking() {

        List<DriverRiskResponse> rankings =
                new ArrayList<>();

        List<Driver> drivers =
                driverRepository.findAll();

        List<Alert> alerts =
                alertRepository.findAll();

        for (Driver driver : drivers) {

            int score = 0;

            for (Alert alert : alerts) {

                if (
                        alert.getDriver() != null &&
                                alert.getDriver().getId()
                                        .equals(driver.getId())
                ) {

                    String severity =
                            alert.getSeverity()
                                    .toUpperCase();

                    if (severity.equals("HIGH")) {
                        score += 10;
                    }
                    else if (severity.equals("MEDIUM")) {
                        score += 5;
                    }
                    else if (severity.equals("LOW")) {
                        score += 2;
                    }
                }
            }

            DriverRiskResponse response =
                    new DriverRiskResponse();

            response.setDriverName(
                    driver.getName()
            );

            response.setRiskScore(score);

            if (score > 70) {
                response.setRiskLevel("HIGH RISK");
            }
            else if (score > 30) {
                response.setRiskLevel("MODERATE");
            }
            else {
                response.setRiskLevel("SAFE");
            }

            rankings.add(response);
        }

        rankings.sort(
                Comparator.comparingInt(
                        DriverRiskResponse::getRiskScore
                ).reversed()
        );

        return rankings;
    }

}