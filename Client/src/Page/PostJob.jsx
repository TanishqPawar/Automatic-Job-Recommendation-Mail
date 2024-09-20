import React, { useState } from "react";
import axios from "axios";
import "./postjob.css";

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [roleCategory, setRoleCategory] = useState("");
  const [education, setEducation] = useState("");
  const [keySkills, setKeySkills] = useState("");

  const handlePostJob = (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      location,
      salary,
      experience,
      jobDescription,
      role,
      industryType,
      employmentType,
      roleCategory,
      education,
      keySkills: keySkills.split(",").map((skill) => skill.trim()), // Convert comma-separated skills to an array
    };

    // Sending the job data to the backend to save in the database
    axios
      .post("http://localhost:3001/postjob", jobData)
      .then((response) => {
        alert("Job Posted Successfully!");
        // Clear the form after submission
        setJobTitle("");
        setLocation("");
        setSalary("");
        setExperience("");
        setJobDescription("");
        setRole("");
        setIndustryType("");
        setEmploymentType("");
        setRoleCategory("");
        setEducation("");
        setKeySkills("");
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  };

  return (
    <div className="post-job-container">
      <h2>Post a Job</h2>
      <form onSubmit={handlePostJob}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Salary Offered</label>
          <input
            type="text"
            placeholder="Salary Offered"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Experience Required</label>
          <input
            type="text"
            placeholder="Experience Required"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Job Description</label>

          <textarea
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Industry Type</label>
          <input
            type="text"
            placeholder="Industry Type"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Employment Type</label>
          <input
            type="text"
            placeholder="Employment Type"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Role Category</label>
          <input
            type="text"
            placeholder="Role Category"
            value={roleCategory}
            onChange={(e) => setRoleCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Education</label>
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Key Skills (comma-separated)</label>
          <input
            type="text"
            placeholder="Key Skills"
            value={keySkills}
            onChange={(e) => setKeySkills(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
