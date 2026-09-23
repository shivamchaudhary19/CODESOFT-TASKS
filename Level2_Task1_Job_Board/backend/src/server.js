import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((s) => s.trim())
      : true,
  })
);

app.use(express.json({ limit: "1mb" }));

let mongoPromise;

function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  if (!mongoPromise) {
    mongoPromise = mongoose.connect(process.env.MONGODB_URI);
  }

  return mongoPromise;
}

// Connect to MongoDB before handling API requests
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Job Board API is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Job Board API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

export default app;

// Local development only
if (!process.env.VERCEL) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 5000;

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Startup failed:", error.message);
      process.exit(1);
    });
}