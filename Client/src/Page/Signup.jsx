import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !skills || !experience || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    console.log("Data to be sent: ", {
      name,
      email,
      skills: skills.split(",").map(skill => skill.trim()), 
      experience,
      password
    });

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        skills: skills.split(",").map(skill => skill.trim()), 
        experience,
        password
      })
      .then((result) => {
        console.log(result.data); 
        if (result.data === "Account already exists") {
          setMessage("Account already exists. Please try logging in.");
        } else if (result.data === "Registration successful") {
          navigate("/login", { state: { message: "Registration successful" } });
        }
      })
      .catch((err) => {
        console.error(err); 
      });
  };

  return (
    <>
      <div className="main_container">
        <div>
          <h2>Freelancer Registration</h2>
          {message && <p className="error_message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skills">
                <strong>Skills (comma-separated)</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Skills"
                autoComplete="off"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="experience">
                <strong>Experience</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Experience"
                autoComplete="off"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <button type="submit" id="registerBtn">
              Register
            </button>
          </form>
          <p>Already Have an Account?</p>
          <Link to="/login" id="loginBtn">
            <button> Login </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
