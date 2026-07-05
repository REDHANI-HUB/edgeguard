import React, { useEffect, useState } from "react";

function DriverPerformance() {

    const [drivers, setDrivers] =
        useState([]);

    useEffect(function () {

        fetch(
            "http://localhost:8080/driver/ranking"
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setDrivers(data);
            });

    }, []);

    function getRating(score) {

        if(score <= 20){
            return "Excellent";
        }

        if(score <= 40){
            return "Good";
        }

        if(score <= 70){
            return "Average";
        }

        return "Poor";
    }

    return (

        <div className="card p-3 mt-4">

            <h3>
                Driver Performance Report
            </h3>

            <table
                className="table table-striped table-hover"
            >

                <thead>

                <tr>

                    <th>Driver</th>
                    <th>Risk Score</th>
                    <th>Performance</th>

                </tr>

                </thead>

                <tbody>

                {
                    drivers.map(function(driver,index){

                        return(

                            <tr key={index}>

                                <td>
                                    {driver.driverName}
                                </td>

                                <td>
                                    {driver.riskScore}
                                </td>

                                <td>

    <span
        className={
            getRating(driver.riskScore)
            === "Excellent"

                ? "badge bg-success"

                : getRating(driver.riskScore)
                === "Good"

                    ? "badge bg-primary"

                    : getRating(driver.riskScore)
                    === "Average"

                        ? "badge bg-warning"

                        : "badge bg-danger"
        }
    >

        {
            getRating(
                driver.riskScore
            )
        }

    </span>

                                </td>
                            </tr>
                        );
                    })
                }

                </tbody>

            </table>

        </div>
    );
}

export default DriverPerformance;