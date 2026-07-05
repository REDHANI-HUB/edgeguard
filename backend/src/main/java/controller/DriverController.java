package com.example.edgeguard.controller;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.edgeguard.dto.DriverRequest;
import com.example.edgeguard.dto.DriverResponse;
import com.example.edgeguard.model.Driver;
import com.example.edgeguard.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.edgeguard.dto.DriverRiskResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/driver")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/register")
    public DriverResponse registerDriver(
    @Valid @RequestBody DriverRequest request){

        Driver driver = new Driver();

        driver.setName(request.getName());
        driver.setEmail(request.getEmail());
        driver.setVehicleNumber(request.getVehicleNumber());

        Driver savedDriver =
                driverService.saveDriver(driver);

        return convertToResponse(savedDriver);
    }


    @GetMapping("/all")
    public List<DriverResponse> getAllDrivers() {

        return driverService.getAllDrivers()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DriverResponse getDriverById(
            @PathVariable Long id) {

        Driver driver =
                driverService.getDriverById(id);

        return convertToResponse(driver);
    }

    @PutMapping("/update/{id}")
    public DriverResponse updateDriver(
            @PathVariable Long id,
            @Valid @RequestBody DriverRequest request) {

        Driver driver = new Driver();

        driver.setName(request.getName());
        driver.setEmail(request.getEmail());
        driver.setVehicleNumber(request.getVehicleNumber());

        Driver updatedDriver =
                driverService.updateDriver(id, driver);

        return convertToResponse(updatedDriver);
    }
    @GetMapping("/page")
    public Page<DriverResponse> getDriversPage(
            @RequestParam int page,
            @RequestParam int size) {

        return driverService
                .getDriversPage(page, size)
                .map(this::convertToResponse);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteDriver(
            @PathVariable Long id) {

        driverService.deleteDriver(id);

        return "Driver Deleted Successfully";
    }
    @GetMapping("/ranking")
    public List<DriverRiskResponse>
    getDriverRanking() {

        return driverService
                .getDriverRanking();
    }

    private DriverResponse convertToResponse(
            Driver driver) {

        DriverResponse response =
                new DriverResponse();

        response.setId(driver.getId());
        response.setName(driver.getName());
        response.setEmail(driver.getEmail());
        response.setVehicleNumber(
                driver.getVehicleNumber()
        );

        return response;
    }
}