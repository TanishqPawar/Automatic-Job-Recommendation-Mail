import React, { useState, useEffect } from "react";
import "./signup.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login request to backend
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          navigate("/freelancer-dashboard"); // If login is successful, navigate to Home page
        } else {
          setMessage(result.data); // Display any error messages
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="main_container">
        <div>
          <h2>Login</h2>
          {message && <p className="error_message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" id="registerBtn">
              Login
            </button>
          </form>
          <p>Don't Have an Account?</p>
          <Link to="/register" id="loginBtn">
            {" "}
            <button> Register </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
