package com.example.edgeguard.service;

import com.example.edgeguard.model.Alert;
import com.example.edgeguard.model.Driver;
import com.example.edgeguard.repository.AlertRepository;
import com.example.edgeguard.repository.DriverRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private AlertRepository alertRepository;

    public byte[] exportDrivers() throws Exception {

        List<Driver> drivers =
                driverRepository.findAll();

        XSSFWorkbook workbook =
                new XSSFWorkbook();

        XSSFSheet sheet =
                workbook.createSheet("Drivers");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("ID");
        header.createCell(1).setCellValue("Name");
        header.createCell(2).setCellValue("Email");
        header.createCell(3).setCellValue("Vehicle Number");

        int rowNum = 1;

        for (Driver driver : drivers) {

            Row row =
                    sheet.createRow(rowNum++);

            row.createCell(0)
                    .setCellValue(driver.getId());

            row.createCell(1)
                    .setCellValue(driver.getName());

            row.createCell(2)
                    .setCellValue(driver.getEmail());

            row.createCell(3)
                    .setCellValue(driver.getVehicleNumber());
        }

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        workbook.write(out);
        workbook.close();

        return out.toByteArray();
    }

    public byte[] exportAlerts() throws Exception {

        List<Alert> alerts =
                alertRepository.findAll();

        XSSFWorkbook workbook =
                new XSSFWorkbook();

        XSSFSheet sheet =
                workbook.createSheet("Alerts");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("ID");
        header.createCell(1).setCellValue("Driver Name");
        header.createCell(2).setCellValue("Alert Type");
        header.createCell(3).setCellValue("Severity");

        int rowNum = 1;

        for (Alert alert : alerts) {

            Row row =
                    sheet.createRow(rowNum++);

            row.createCell(0)
                    .setCellValue(alert.getId());

            row.createCell(1)
                    .setCellValue(
                            alert.getDriver().getName()
                    );

            row.createCell(2)
                    .setCellValue(alert.getAlertType());

            row.createCell(3)
                    .setCellValue(alert.getSeverity());
        }

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        workbook.write(out);
        workbook.close();

        return out.toByteArray();
    }
}