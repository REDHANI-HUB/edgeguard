package com.example.edgeguard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AlertRequest {

    @NotNull(message = "Driver ID is Required")
    private Long driverId;

    @NotBlank(message = "Alert Type is Required")
    private String alertType;

    @NotBlank(message = "Severity is Required")
    private String severity;

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}