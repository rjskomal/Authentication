import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/signup",
        { username, email, password, role },  
        { withCredentials: true }
      );
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
