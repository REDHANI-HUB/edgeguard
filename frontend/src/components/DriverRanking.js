import React, { useEffect, useState } from "react";

function DriverRanking(props) {

    const [rankings, setRankings] =
        useState([]);

    useEffect(function() {

        fetch(
            "http://localhost:8080/driver/ranking"
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                setRankings(data);

                if(data.length > 0){

                    props.setMostRiskyDriver(
                        data[0]
                    );

                    props.setSafestDriver(
                        data[data.length - 1]
                    );
                }
            });

    }, []);

    return (

        <div className="card p-3 mt-4">

            <h3>
                Driver Risk Leaderboard
            </h3>

            <table className="table table-dark table-hover">

                <thead>

                <tr>
                    <th>Rank</th>
                    <th>Driver Name</th>
                    <th>Risk Score</th>
                    <th>Risk Level</th>
                </tr>

                </thead>

                <tbody>

                {
                    rankings.map(
                        function(driver,index){

                            return(

                                <tr key={index}>

                                    <td>

                                        {
                                            index === 0
                                                ? "🥇"

                                                : index === 1
                                                    ? "🥈"

                                                    : index === 2
                                                        ? "🥉"

                                                        : index + 1
                                        }

                                    </td>

                                    <td>
                                        {driver.driverName}
                                    </td>

                                    <td>
                                        {driver.riskScore}
                                    </td>

                                    <td>
                                        {driver.riskLevel}
                                    </td>

                                </tr>

                            );
                        }
                    )
                }

                </tbody>

            </table>

        </div>
    );
}

export default DriverRanking;