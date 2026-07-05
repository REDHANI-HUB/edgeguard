import React, { useState, useEffect } from "react";

function DriverForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");

    useEffect(function () {

        if (props.editingDriver) {

            setName(props.editingDriver.name);
            setEmail(props.editingDriver.email);
            setVehicleNumber(props.editingDriver.vehicleNumber);
        }

    }, [props.editingDriver]);

    function saveDriver() {

        if (props.editingDriver) {

            fetch(
                `http://localhost:8080/driver/update/${props.editingDriver.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        vehicleNumber: vehicleNumber
                    })
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function() {

                    alert("Driver Updated Successfully");

                    setName("");
                    setEmail("");
                    setVehicleNumber("");

                    props.onDriverAdded();
                });

        } else {

            fetch(
                "http://localhost:8080/driver/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        vehicleNumber: vehicleNumber
                    })
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function() {

                    alert("Driver Added Successfully");

                    setName("");
                    setEmail("");
                    setVehicleNumber("");

                    props.onDriverAdded();
                });
        }
    }

    return (
        <div className="card p-3 mb-4">

            <h2>
                {
                    props.editingDriver
                        ? "Update Driver"
                        : "Add Driver"
                }
            </h2>

            <input
                className="form-control"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br />

            <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <input
                className="form-control"
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
            />

            <br />

            <button
                className="btn btn-primary"
                onClick={saveDriver}
            >
                {
                    props.editingDriver
                        ? "Update Driver"
                        : "Save Driver"
                }
            </button>

        </div>
    );
}

export default DriverForm;