// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Page/Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login.jsx";
import Home from "./Page/Home.jsx";
import PostJob from "./Page/PostJob.jsx";
import JobList from "./Page/FreelancerDashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/freelancer-dashboard" element={<JobList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
