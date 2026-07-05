import React, { useState, useEffect } from "react";

function AlertForm(props) {

    const [driverId, setDriverId] = useState("");
    const [alertType, setAlertType] = useState("");
    const [severity, setSeverity] = useState("");

    useEffect(function () {

        if (props.editingAlert) {

            setDriverId(props.editingAlert.driverId);
            setAlertType(props.editingAlert.alertType);
            setSeverity(props.editingAlert.severity);
        }

    }, [props.editingAlert]);

    function saveAlert() {

        if (props.editingAlert) {

            fetch(
                `http://localhost:8080/alert/update/${props.editingAlert.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        driverId: driverId,
                        alertType: alertType,
                        severity: severity
                    })
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function() {

                    alert("Alert Updated Successfully");

                    setDriverId("");
                    setAlertType("");
                    setSeverity("");

                    props.onAlertAdded();
                });

        } else {

            fetch(
                "http://localhost:8080/alert/save",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        driverId: driverId,
                        alertType: alertType,
                        severity: severity
                    })
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function() {

                    alert("Alert Added Successfully");

                    setDriverId("");
                    setAlertType("");
                    setSeverity("");

                    props.onAlertAdded();
                });
        }
    }

    return (
        <div className="card p-3 mb-4">

            <h2>
                {
                    props.editingAlert
                        ? "Update Alert"
                        : "Add Alert"
                }
            </h2>

            <input
                className="form-control"
                type="number"
                placeholder="Driver ID"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
            />

            <br />

            <input
                className="form-control"
                type="text"
                placeholder="Alert Type"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
            />

            <br />

            <input
                className="form-control"
                type="text"
                placeholder="Severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
            />

            <br />

            <button
                className="btn btn-success"
                onClick={saveAlert}
            >
                {
                    props.editingAlert
                        ? "Update Alert"
                        : "Save Alert"
                }
            </button>

        </div>
    );
}

export default AlertForm;