package com.example.edgeguard.service;

import com.example.edgeguard.exception.ResourceNotFoundException;
import com.example.edgeguard.model.Alert;
import com.example.edgeguard.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private EmailService emailService;

    public Alert saveAlert(Alert alert) {

        Alert savedAlert =
                alertRepository.save(alert);

        try {

            if (
                    savedAlert.getSeverity() != null
                            &&
                            savedAlert.getSeverity()
                                    .equalsIgnoreCase("HIGH")
            ) {

                emailService.sendAlertEmail(
                        savedAlert.getAlertType(),
                        savedAlert.getSeverity()
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "Email Sending Failed: "
                            + e.getMessage()
            );
        }

        return savedAlert;
    }
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public Page<Alert> getAlertsPage(
            int page,
            int size) {

        return alertRepository.findAll(
                PageRequest.of(page, size)
        );
    }

    public Alert getAlertById(Long id) {

        return alertRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alert Not Found With ID : " + id
                        ));
    }

    public Alert updateAlert(Long id, Alert updatedAlert) {

        Alert alert = alertRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alert Not Found With ID : " + id
                        ));

        alert.setDriver(updatedAlert.getDriver());
        alert.setAlertType(updatedAlert.getAlertType());
        alert.setSeverity(updatedAlert.getSeverity());

        return alertRepository.save(alert);
    }

    public void deleteAlert(Long id) {

        if (!alertRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Alert Not Found With ID : " + id
            );
        }

        alertRepository.deleteById(id);
    }
}