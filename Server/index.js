import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import FreelancerModel from "./models/freelancer.js";
import JobModel from "./models/postjob.js";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/freelancer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error("MongoDB connection error:", error));

// Email setup using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tanishqpawar402@gmail.com', 
    pass: 'bopx gqyy zsoi xclq', 
  },
});

// Skill matching function
const matchSkills = (freelancerSkills, jobSkills) => {
  // If freelancerSkills is an array, no need to split it
  const freelancerSkillsArr = Array.isArray(freelancerSkills) 
    ? freelancerSkills.map(skill => skill.toLowerCase().trim()) 
    : freelancerSkills.toLowerCase().split(",").map(skill => skill.trim());

  // Convert job skills to an array and format it
  const jobSkillsArr = jobSkills.toLowerCase().split(",").map(skill => skill.trim());

  return freelancerSkillsArr.some(skill => jobSkillsArr.includes(skill));
};

// Recommendation algorithm
const sendRecommendations = async () => {
  try {
    const freelancers = await FreelancerModel.find();
    const jobs = await JobModel.find();

    freelancers.forEach(async (freelancer) => {
      jobs.forEach(async (job) => {
        // Convert freelancer ID to a string for comparison
        const freelancerIdStr = freelancer._id.toString();

        // Check if the freelancer was already notified for this job
        if (!job.notifiedFreelancers.includes(freelancerIdStr) && 
            matchSkills(freelancer.skills, job.keySkills.join(","))) {

          // Send the email
          const mailOptions = {
            from: 'your_email@gmail.com',
            to: freelancer.email,
            subject: `New Job Match: ${job.jobTitle}`,
            text: `Hi ${freelancer.name},\n\nA new job has been posted that matches your skills:\n\nJob Title: ${job.jobTitle}\nSkills Required: ${job.keySkills.join(", ")}\n\nApply now!`,
          };

          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);

              // After successfully sending the email, use findOneAndUpdate to atomically update the notifiedFreelancers
              await JobModel.findOneAndUpdate(
                { _id: job._id }, 
                { $addToSet: { notifiedFreelancers: freelancerIdStr } }, // $addToSet prevents duplicates in the array
                { new: true }
              );
            }
          });
        }
      });
    });

    console.log("Job recommendations sent successfully!");
  } catch (error) {
    console.error("Error sending job recommendations:", error);
  }
};


setInterval(sendRecommendations, 5000);

// Login Page Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  FreelancerModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success"); 
      } else {
        res.json("The password is incorrect"); 
      }
    } else {
      res.json("No record exists"); 
    }
  });
});

// Sign Up Page Route
app.post("/register", (req, res) => {
  const { name, email, password, skills, experience } = req.body;

  FreelancerModel.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      res.json("Account already exists");
    } else {
      FreelancerModel.create({
        name,
        email,
        password,
        skills,
        experience,
      })
        .then(() => res.json("Registration successful"))
        .catch((err) => res.json({ error: "Error during registration", err }));
    }
  });
});

// Post a Job Route
app.post("/postjob", (req, res) => {
  const { jobTitle, location, salary, experience, jobDescription, role, industryType, employmentType, roleCategory, education, keySkills } = req.body;

  JobModel.create({
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
    keySkills,
  })
  .then(() => {
    res.json("Job Posted Successfully");
    sendRecommendations(); 
  })
  .catch((err) => res.json({ error: "Error posting job", err }));
});

// Ensure only one app.listen
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


//Fetch Entered job data route

app.get("/jobs", (req, res) => {
  JobModel.find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
});