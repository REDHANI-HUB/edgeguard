import React from "react";

function AIInsights(props) {

    return (

        <div className="card p-3 mt-4">

            <div className="card-body">

                <h4>
                    AI Safety Insights
                </h4>

                <p>
                    Total Alerts:
                    {" "}
                    {props.alertCount}
                </p>

                <p>
                    Risk Score:
                    {" "}
                    {props.riskScore}
                </p>

                <p>
                    Accident Probability:
                    {" "}
                    {props.accidentProbability}%
                </p>

                <p>
                    Recommendation:
                    {" "}
                    {props.recommendation}
                </p>

            </div>

        </div>
    );
}

export default AIInsights;