import React, { useState } from 'react';
import { registerUser } from './services/login-service';
import './RegisterForm.css'

function RegisterForm({ onRegisterSuccess, onClose }) {
    const [userData, setUserData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser(userData)
            .then(() => {
                alert("Registration successful! Please log in.");
                onRegisterSuccess();  // Tell parent to switch to login
            })
            .catch((err) => {
                console.error("Registration failed:", err);
                setError('Registration failed: ' + err.message);
            });
    };


    return (
        <div>
            {error && <p className="error">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
