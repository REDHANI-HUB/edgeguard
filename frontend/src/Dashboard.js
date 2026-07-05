import React, { useEffect, useState } from "react";
import DriverForm from "./components/DriverForm";
import AlertForm from "./components/AlertForm";
import AlertChart from "./components/AlertChart";
import SystemChart from "./components/SystemChart";
import DriverRanking
    from "./components/DriverRanking";
import AIInsights
    from "./components/AIInsights";
import AlertTrendChart
    from "./components/AlertTrendChart";
import DriverPerformance
    from "./components/DriverPerformance";
import DriverAlertChart
    from "./components/DriverAlertChart";
import {
    FaUsers,
    FaBell,
    FaShieldAlt,
    FaHeartbeat,
    FaExclamationTriangle
}
    from "react-icons/fa";

function Dashboard() {

    const userEmail =
        localStorage.getItem(
            "userEmail"
        );

    const [drivers, setDrivers] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [editingDriver, setEditingDriver] = useState(null);
    const [editingAlert, setEditingAlert] = useState(null);

    const latestDriver =
        drivers.length > 0
            ? drivers[drivers.length - 1]
            : null;
    const driverNames =
        drivers.map(
            driver =>
                driver.name
        );

    const alertCounts =
        drivers.map(function(driver){

            return alerts.filter(function(alert){

                return (
                    alert.driverName ===
                    driver.name
                );

            }).length;

        });
    const hasHighAlert =
        alerts.some(
            alert =>
                alert.severity === "HIGH"
        );
    const [mostRiskyDriver,
        setMostRiskyDriver] =
        useState(null);

    const [safestDriver,
        setSafestDriver] =
        useState(null);
    const [searchDriver, setSearchDriver] = useState("");
    const [searchAlert, setSearchAlert] = useState("");

    const [driverPage, setDriverPage] = useState(0);
    const [driverTotalPages, setDriverTotalPages] = useState(0);

    const highAlerts = alerts.filter(function(alert) {
        return alert.severity &&
            alert.severity.toUpperCase() === "HIGH";
    }).length;
    const criticalAlerts =
        alerts.filter(
            alert =>
                alert.severity &&
                alert.severity.toUpperCase() === "HIGH"
        ).length;

    const mediumAlerts = alerts.filter(function(alert) {
        return alert.severity &&
            alert.severity.toUpperCase() === "MEDIUM";
    }).length;

    const lowAlerts = alerts.filter(function(alert) {
        return alert.severity &&
            alert.severity.toUpperCase() === "LOW";
    }).length;
    const riskScore =
        (highAlerts * 10) +
        (mediumAlerts * 5) +
        (lowAlerts * 2);
    const averageRisk =
        alerts.length === 0
            ? 0
            : Math.round(
                riskScore /
                alerts.length
            );
    const safetyScore =
        Math.max(
            0,
            100 - riskScore
        );
    const currentTime =
        new Date().toLocaleTimeString();
    const accidentProbability =
        Math.min(
            riskScore,
            100
        );
    const fleetHealthScore =
        Math.round(
            (safetyScore +
                (100 - accidentProbability)) / 2
        );
    let fleetHealthStatus =
        "GOOD";

    if(fleetHealthScore < 40){

        fleetHealthStatus =
            "CRITICAL";

    }
    else if(fleetHealthScore < 70){

        fleetHealthStatus =
            "WARNING";

    }



    let recommendation =
        "Safe Driver";

    if(riskScore > 70){

        recommendation =
            "Immediate Training Required";

    }
    else if(riskScore > 30){

        recommendation =
            "Monitor Driving Behaviour";

    }

    let riskLevel = "SAFE";

    if (riskScore > 70) {
        riskLevel = "HIGH RISK";
    }
    else if (riskScore > 30) {
        riskLevel = "MODERATE RISK";
    }
    let fleetStatus = "SAFE";

    if (riskScore > 70) {
        fleetStatus = "HIGH RISK";
    }
    else if (riskScore > 30) {
        fleetStatus = "MODERATE RISK";
    }
    function fetchDrivers(page = 0) {

        fetch(
            `http://localhost:8080/driver/page?page=${page}&size=5`
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                setDrivers(data.content);
                setDriverTotalPages(data.totalPages);
                setDriverPage(page);

            })
            .catch(function(error) {
                console.log("Driver Error:", error);
            });
    }

    function fetchAlerts() {

        fetch("http://localhost:8080/alert/all")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setAlerts(data);
            })
            .catch(function(error) {
                console.log("Alert Error:", error);
            });
    }

    function editDriver(driver) {
        setEditingDriver(driver);
    }

    function editAlert(alert) {
        setEditingAlert(alert);
    }

    function deleteDriver(id) {

        fetch(`http://localhost:8080/driver/delete/${id}`, {
            method: "DELETE"
        })
            .then(function() {

                alert("Driver Deleted");

                fetchDrivers(driverPage);

                if (
                    editingDriver &&
                    editingDriver.id === id
                ) {
                    setEditingDriver(null);
                }
            });
    }

    function deleteAlert(id) {

        fetch(`http://localhost:8080/alert/delete/${id}`, {
            method: "DELETE"
        })
            .then(function() {

                alert("Alert Deleted");

                fetchAlerts();

                if (
                    editingAlert &&
                    editingAlert.id === id
                ) {
                    setEditingAlert(null);
                }
            });
    }
    function exportAlerts() {

        window.open(
            "http://localhost:8080/export/alerts",
            "_blank"
        );
    }
    function logout() {

        localStorage.removeItem("loggedIn");

        window.location.href = "/";
    }

    useEffect(function () {

        if (
            localStorage.getItem("loggedIn")
            !== "true"
        ) {

            window.location.href = "/";
            return;
        }

        fetchDrivers(driverPage);
        fetchAlerts();

    }, [driverPage]);


    return (
        <div className="container mt-4">
        <div className="card shadow mb-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h1>
                            🛡️ EdgeGuard
                        </h1>

                        <h5>
                            AI Fleet Safety Analytics Platform
                        </h5>

                        <p>
                            Welcome {userEmail}
                        </p>

                    </div>

                    <div>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>

    <div className="mb-4">

        <button
            className="btn btn-success me-2"
            onClick={exportAlerts}
        >
            Export Alerts Excel
        </button>

        <button
            className="btn btn-success me-2"
            onClick={() =>
                window.open(
                    "http://localhost:8080/export/drivers",
                    "_blank"
                )
            }
        >
            Export Drivers
        </button>

        <button
            className="btn btn-primary me-2"
            onClick={() =>
                window.open(
                    "http://localhost:8080/export/alerts",
                    "_blank"
                )
            }
        >
            Export Alerts
        </button>

    </div>

            <DriverForm
                onDriverAdded={() =>
                    fetchDrivers(driverPage)
                }
                editingDriver={editingDriver}
            />

            <AlertForm
                onAlertAdded={fetchAlerts}
                editingAlert={editingAlert}
            />


            {
                hasHighAlert &&
                (
                    <div className="alert alert-danger">

                        ⚠ High Severity Alerts Detected

                    </div>
                )
            }
            {
                riskScore > 30 &&
                (
                    <div className="alert alert-warning">

                        Driver Risk Score:
                        {" "}
                        {riskScore}
                        {" "}
                        (
                        {riskLevel}
                        )

                    </div>
                )
            }
            <div className="row mb-4">

                <div className="col-md-2">
                    <div className="card shadow border-0 h-100">
                        <div className="card-body">

                            <h6>
                                Live Monitor
                            </h6>

                            <h3>
                                🟢 ONLINE
                            </h3>

                            <small>
                                {currentTime}
                            </small>

                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card bg-info text-white shadow text-center">
                        <div className="card-body">

                            <h6>
                                Fleet Health
                            </h6>

                            <h3>
                                {fleetHealthScore}%
                            </h3>

                            <small>
                                {fleetHealthStatus}
                            </small>

                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">

                            <h6>
                                <FaHeartbeat /> Fleet Health
                            </h6>

                            <h3
                                className={
                                    fleetStatus === "HIGH RISK"
                                        ? "text-danger"
                                        : fleetStatus === "MODERATE RISK"
                                            ? "text-warning"
                                            : "text-success"
                                }
                            >
                                {fleetStatus}
                            </h3>

                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">
                            <h6>Average Risk</h6>
                            <h3>{averageRisk}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h6>AI Recommendation</h6>
                            <p>{recommendation}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">
                            <h6>Accident Probability</h6>
                            <h3>{accidentProbability}%</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card bg-success text-white shadow text-center">
                        <div className="card-body">
                            <h6>
                                <FaShieldAlt /> Safety Score
                            </h6>
                            <h3>{safetyScore}%</h3>
                        </div>
                    </div>
                </div>


                <div className="col-md-2">
                    <div className="card bg-danger text-white shadow text-center">
                        <div className="card-body">

                            <h6>
                                <FaExclamationTriangle /> Risk Score
                            </h6>

                            <h3>
                                {riskScore}
                            </h3>

                            <small>
                                {riskLevel}
                            </small>

                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="card bg-primary text-white shadow text-center">
                        <div className="card-body">
                            <h6>
                                <FaUsers /> Total Drivers
                            </h6>
                            <h3>{drivers.length}</h3>
                        </div>
                    </div>
                </div>


                <div className="col-md-2">
                    <div className="card bg-secondary text-white shadow text-center">
                        <div className="card-body">
                            <h6>
                                <FaBell /> Total Alerts
                            </h6>
                            <h3>{alerts.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">
                            <h6>High Alerts</h6>
                            <h3>{highAlerts}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">
                            <h6>Medium Alerts</h6>
                            <h3>{mediumAlerts}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">
                            <h6>Low Alerts</h6>
                            <h3>{lowAlerts}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div
                        className="card shadow border-0 h-100"
                    >
                        <div className="card-body">

                            <h6>
                                Latest Driver
                            </h6>

                            <p>
                                {
                                    latestDriver
                                        ? latestDriver.name
                                        : "No Driver"
                                }
                            </p>

                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="card bg-dark text-white shadow text-center">
                        <div className="card-body">
                            <h6>System Status</h6>
                            <h3>ACTIVE</h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Keep the rest of your Drivers table, Alerts table and Pagination code exactly as you already have it */}
            <div className="row">

                <div className="col-md-6">

                    <AlertChart
                        highAlerts={highAlerts}
                        mediumAlerts={mediumAlerts}
                        lowAlerts={lowAlerts}
                    />

                </div>

                <div className="col-md-6">

                    <SystemChart
                        driverCount={drivers.length}
                        alertCount={alerts.length}
                    />

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-12">

                    <AlertTrendChart
                        highAlerts={highAlerts}
                        mediumAlerts={mediumAlerts}
                        lowAlerts={lowAlerts}
                    />

                </div>

            </div>
            <DriverAlertChart
                driverNames={driverNames}
                alertCounts={alertCounts}
            />
            <div className="row mt-4">

                <div className="col-md-6">

                    <div
                        className="card"
                        style={{
                            border:
                                "2px solid #ef4444"
                        }}
                    >

                        <div className="card-body">

                            <h5>
                                ⚠ Most Risky Driver
                            </h5>

                            <p>
                                {
                                    mostRiskyDriver
                                        ?
                                        mostRiskyDriver.driverName
                                        :
                                        "Loading..."
                                }
                            </p>

                            <p>
                                Score:
                                {
                                    mostRiskyDriver
                                        ?
                                        mostRiskyDriver.riskScore
                                        :
                                        "-"
                                }
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div
                        className="card"
                        style={{
                            border:
                                "2px solid #22c55e"
                        }}
                    >

                        <div className="card-body">

                            <h5>
                                ✅ Safest Driver
                            </h5>

                            <p>
                                {
                                    safestDriver
                                        ?
                                        safestDriver.driverName
                                        :
                                        "Loading..."
                                }
                            </p>

                            <p>
                                Score:
                                {
                                    safestDriver
                                        ?
                                        safestDriver.riskScore
                                        :
                                        "-"
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>
            <div className="card mt-4">

                <div className="card-body">

                    <h4>
                        🚨 Emergency Alert Center
                    </h4>
                    <div
                        className="alert alert-danger mt-4"
                    >

                        ⚠ Highest Risk Driver :

                        {
                            mostRiskyDriver
                                ?
                                mostRiskyDriver.driverName
                                :
                                "-"
                        }

                    </div>

                    <h2 className="text-danger">
                        {criticalAlerts}
                    </h2>

                    <p>
                        High Severity Alerts Detected
                    </p>

                    {
                        criticalAlerts > 0
                            ?
                            (
                                <div
                                    className="alert alert-danger"
                                >
                                    Immediate Action Required
                                </div>
                            )
                            :
                            (
                                <div
                                    className="alert alert-success"
                                >
                                    No Critical Alerts
                                </div>
                            )
                    }

                </div>

            </div>
            <div className="row mt-4">

                <div className="col-md-8">

                    <DriverRanking
                        setMostRiskyDriver={
                            setMostRiskyDriver
                        }
                        setSafestDriver={
                            setSafestDriver
                        }
                    />

                </div>

                <div className="col-md-4">

                    <AIInsights
                        alertCount={alerts.length}
                        riskScore={riskScore}
                        accidentProbability={
                            accidentProbability
                        }
                        recommendation={
                            recommendation
                        }
                    />

                </div>

            </div>

            <DriverPerformance />
            <div
                className="text-center mt-4 mb-2"
                style={{
                    color: "#94a3b8"
                }}
            >

                EdgeGuard © 2026 |
                AI Powered Fleet Safety Analytics

            </div>
            <div className="text-center mt-5 mb-3">

                <hr />

                <h6>
                    EdgeGuard © 2026
                </h6>
                <h6>
                    AI Powered Fleet Safety Analytics Platform
                </h6>

            </div>
        </div>

    );
}

export default Dashboard;