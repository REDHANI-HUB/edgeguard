import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AlertChart(props) {

    const data = {
        labels: [
            "High Alerts",
            "Medium Alerts",
            "Low Alerts"
        ],
        datasets: [
            {
                label: "Alerts",
                data: [
                    props.highAlerts,
                    props.mediumAlerts,
                    props.lowAlerts
                ],
                backgroundColor: [
                    "#ef4444",
                    "#f59e0b",
                    "#22c55e"
                ]
            }
        ]
    };


    return (
        <div className="card p-3 mt-4">
            <h3 className="text-center">
                Alert Severity Analytics
            </h3>
            <div
                style={{
                    width: "400px",
                    margin: "auto"
                }}
            >
                <Pie data={data} />
            </div>
        </div>
    );
}

export default AlertChart;