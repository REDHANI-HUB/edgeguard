package com.example.edgeguard.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class DriverRequest {

    @NotBlank(message = "Driver Name is Required")
    private String name;

    @NotBlank(message = "Email is Required")
    @Email(message = "Enter Valid Email")
    private String email;

    @NotBlank(message = "Vehicle Number is Required")
    private String vehicleNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }
}