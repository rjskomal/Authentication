import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
            toast.success("Login successful!");

            if (res.data.role === "admin") {
                navigate("/AdminDashboard");
            } else {
                navigate("/posts");  
            }
        } catch (err) {
            toast.error("Login failed: " + (err.response?.data || "Unknown error"));
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
