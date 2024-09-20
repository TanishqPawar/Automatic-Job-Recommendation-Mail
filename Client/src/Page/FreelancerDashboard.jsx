import React, { useEffect, useState } from "react";
import axios from "axios";
import "./freelancerDashboard.css"
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="job-list-container">
      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
      <h1>Avalaible Jobs</h1>
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div className="job-card" key={index}>
              <h1>{job.jobTitle}</h1>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> {job.salary}
              </p>
              <p>
                <strong>Experience Required:</strong> {job.experience}
              </p>
              <p>
                <strong>Job Description:</strong> {job.jobDescription}
              </p>
              <p>
                <strong>Role:</strong> {job.role}
              </p>
              <p>
                <strong>Industry Type:</strong> {job.industryType}
              </p>
              <p>
                <strong>Employment Type:</strong> {job.employmentType}
              </p>
              <p>
                <strong>Role Category:</strong> {job.roleCategory}
              </p>
              <p>
                <strong>Education:</strong> {job.education}
              </p>
              <p>
                <strong>Key Skills:</strong> {job.keySkills.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>No job listings available.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
