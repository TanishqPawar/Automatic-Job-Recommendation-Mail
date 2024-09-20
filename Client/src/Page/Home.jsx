import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Freelance Platform</h1>
      <div className="button-group">
        <Link to="/register">
          <button className="home-btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>
        <Link to="/post-job">
          <button className="home-btn">Post a Job</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
