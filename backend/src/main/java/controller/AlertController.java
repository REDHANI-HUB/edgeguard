package com.example.edgeguard.controller;

import jakarta.validation.Valid;

import com.example.edgeguard.dto.AlertRequest;
import com.example.edgeguard.dto.AlertResponse;
import com.example.edgeguard.model.Alert;
import com.example.edgeguard.model.Driver;
import com.example.edgeguard.repository.DriverRepository;
import com.example.edgeguard.service.AlertService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alert")
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @Autowired
    private DriverRepository driverRepository;

    @PostMapping("/save")
    public AlertResponse saveAlert(
            @Valid @RequestBody AlertRequest request) {

        Driver driver = driverRepository
                .findById(request.getDriverId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Driver Not Found"
                        ));

        Alert alert = new Alert();

        alert.setDriver(driver);
        alert.setAlertType(request.getAlertType());
        alert.setSeverity(request.getSeverity());

        Alert savedAlert =
                alertService.saveAlert(alert);

        return convertToResponse(savedAlert);
    }

    @GetMapping("/all")
    public List<AlertResponse> getAllAlerts() {

        return alertService.getAllAlerts()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AlertResponse getAlertById(
            @PathVariable Long id) {

        Alert alert =
                alertService.getAlertById(id);

        return convertToResponse(alert);
    }

    @GetMapping("/page")
    public Page<AlertResponse> getAlertsPage(
            @RequestParam int page,
            @RequestParam int size) {

        return alertService
                .getAlertsPage(page, size)
                .map(this::convertToResponse);
    }

    @PutMapping("/update/{id}")
    public AlertResponse updateAlert(
            @PathVariable Long id,
            @Valid @RequestBody AlertRequest request) {

        Driver driver = driverRepository
                .findById(request.getDriverId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Driver Not Found"
                        ));

        Alert alert = new Alert();

        alert.setDriver(driver);
        alert.setAlertType(request.getAlertType());
        alert.setSeverity(request.getSeverity());

        Alert updatedAlert =
                alertService.updateAlert(id, alert);

        return convertToResponse(updatedAlert);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAlert(
            @PathVariable Long id) {

        alertService.deleteAlert(id);

        return "Alert Deleted Successfully";
    }

    private AlertResponse convertToResponse(
            Alert alert) {

        AlertResponse response =
                new AlertResponse();

        response.setId(alert.getId());

        if (alert.getDriver() != null) {

            response.setDriverId(
                    alert.getDriver().getId()
            );

            response.setDriverName(
                    alert.getDriver().getName()
            );
        }

        response.setAlertType(
                alert.getAlertType()
        );

        response.setSeverity(
                alert.getSeverity()
        );

        return response;
    }
}