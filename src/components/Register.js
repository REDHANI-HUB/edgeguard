import React, { useState } from "react";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function registerUser() {

        fetch(
            "http://localhost:8080/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                alert(
                    "Registration Successful"
                );

                window.location.href = "/";
            });
    }

    return (
        <div className="container mt-5">

            <h2>Register</h2>

            <input
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                className="btn btn-success"
                onClick={registerUser}
            >
                Register
            </button>
            <br /><br />

            <a href="/">
                Already Have an Account? Login
            </a>

        </div>
    );
}

export default Register;