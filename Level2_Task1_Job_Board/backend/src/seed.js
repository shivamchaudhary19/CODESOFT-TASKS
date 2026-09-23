import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Job from "./models/Job.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
let employer = await User.findOne({ email: "demo@technova.dev" });
if (!employer) employer = await User.create({ name: "TechNova HR", email: "demo@technova.dev", password: await bcrypt.hash("Demo1234", 10), role: "employer", companyName: "TechNova" });
await Job.deleteMany({ employer: employer._id });
await Job.insertMany([
  { title: "Frontend Developer Intern", company: "TechNova", location: "Noida, India", category: "Engineering", type: "Internship", salary: "₹20k–₹30k/month", description: "Work with React and modern frontend tooling to build responsive product experiences.", skills: ["React", "JavaScript", "CSS"], requirements: ["Basic React knowledge", "Git fundamentals"], employer: employer._id },
  { title: "Backend Developer", company: "CloudSprint", location: "Remote", category: "Engineering", type: "Full-time", salary: "₹7–12 LPA", description: "Build REST APIs and backend services using Node.js, Express and MongoDB.", skills: ["Node.js", "Express", "MongoDB"], requirements: ["REST API experience", "Database fundamentals"], employer: employer._id },
  { title: "Full Stack Developer", company: "PixelForge", location: "Greater Noida, India", category: "Engineering", type: "Full-time", salary: "₹8–14 LPA", description: "Develop features across React frontend and Node.js backend systems.", skills: ["React", "Node.js", "MongoDB"], requirements: ["Full-stack project experience", "Git"], employer: employer._id }
]);
console.log("Seed complete. Employer login: demo@technova.dev / Demo1234");
await mongoose.disconnect();
