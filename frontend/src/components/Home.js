import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome</h2>
      <p>Please choose an option:</p>
      <div className="btn-group">
        <Link to="/signup" className="btn">Sign Up</Link>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
};

export default Home;