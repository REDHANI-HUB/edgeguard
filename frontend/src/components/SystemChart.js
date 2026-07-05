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

function SystemChart(props) {

    const data = {
        labels: ["Drivers", "Alerts"],
        datasets: [
            {
                label: "Count",
                data: [
                    props.driverCount,
                    props.alertCount
                ],
                backgroundColor: [
                    "#3b82f6",
                    "#8b5cf6"
                ]
            }
        ]
    };

    return (
        <div className="card p-3 mt-4">
            <h3 className="text-center">
                System Overview Dashboard
            </h3>
            <div
                style={{
                    width: "600px",
                    margin: "auto"
                }}
            >
                <Bar data={data} />
            </div>
        </div>
    );
}

export default SystemChart;