package com.example.edgeguard.controller;

import com.example.edgeguard.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/export")
@CrossOrigin(origins = "http://localhost:3000")
public class ExportController {

    @Autowired
    private ExcelService excelService;

    @GetMapping("/alerts")
    public ResponseEntity<byte[]> exportAlerts()
            throws Exception {

        byte[] excelData =
                excelService.exportAlerts();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=alerts.xlsx"
                )
                .body(excelData);
    }
    @GetMapping("/drivers")
    public ResponseEntity<byte[]> exportDrivers()
            throws Exception {

        byte[] excelData =
                excelService.exportDrivers();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=drivers.xlsx"
                )
                .body(excelData);
    }
}