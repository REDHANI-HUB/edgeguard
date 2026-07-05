package com.example.edgeguard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAlertEmail(
            String alertType,
            String severity) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo("admin@gmail.com");

        message.setSubject(
                "EdgeGuard Alert Notification"
        );

        message.setText(
                "Alert Type: " + alertType +
                        "\nSeverity: " + severity
        );

        mailSender.send(message);
    }
}