import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './Dashboard';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

            </Routes>

        </BrowserRouter>

    </React.StrictMode>
);

reportWebVitals();