import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
}
    from "chart.js";

import { Bar }
    from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DriverAlertChart(props) {

    const data = {

        labels:
        props.driverNames,

        datasets: [

            {
                label:
                    "Alerts",

                data:
                props.alertCounts,

                backgroundColor:
                    "#3b82f6"
            }

        ]
    };

    return (

        <div className="card p-3 mt-4">

            <h3 className="text-center">
                Driver Alert Distribution Analytics
            </h3>

            <Bar data={data} />

        </div>

    );
}

export default DriverAlertChart;