import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  location: String,
  salary: String,
  experience: String,
  jobDescription: String,
  role: String,
  industryType: String,
  employmentType: String,
  roleCategory: String,
  education: String,
  keySkills: [String],
  notifiedFreelancers: [String]
});

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
