import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map(s => s.trim()) : true }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => res.json({ success: true, message: "Job Board API is running" }));
app.get("/api/health", (_req, res) => res.json({ success: true, message: "Job Board API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(error => { console.error("Startup failed:", error.message); process.exit(1); });
