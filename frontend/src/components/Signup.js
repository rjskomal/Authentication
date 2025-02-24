import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/signup",
        { username, email, password },
        { withCredentials: true } 
      );
      
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;