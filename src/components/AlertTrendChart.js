import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AlertTrendChart(props) {

    const data = {

        labels: [
            "High",
            "Medium",
            "Low"
        ],

        datasets: [

            {
                label: "Alert Trend",

                data: [
                    props.highAlerts,
                    props.mediumAlerts,
                    props.lowAlerts
                ],

                backgroundColor: [
                    "#dc3545",
                    "#ffc107",
                    "#198754"
                ]
            }

        ]
    };

    return (
        <div className="card p-3 mt-4">

            <h3 className="text-center">
                Alert Trend Analysis
            </h3>

            <Bar data={data} />

        </div>
    );
}

export default AlertTrendChart;