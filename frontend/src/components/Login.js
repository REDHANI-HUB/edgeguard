import React, { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function loginUser() {

        fetch(
            "http://localhost:8080/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {

                alert(data);

                if (
                    data ===
                    "Login Successful"
                ) {

                    localStorage.setItem(
                        "loggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "userEmail",
                        email
                    );

                    window.location.href =
                        "/dashboard";
                }
            });
    }

    return (
        <div className="container mt-5">

            <h2>Login</h2>

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
                className="btn btn-primary"
                onClick={loginUser}
            >
                Login
            </button>
            <br /><br />

            <a href="/register">
                New User? Register Here
            </a>
        </div>
    );
}

export default Login;