import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], required: true }, // Updated to handle array of skills
  experience: { type: String, required: true },
});

const FreelancerModel = mongoose.model("freelancer", freelancerSchema);
export default FreelancerModel;
