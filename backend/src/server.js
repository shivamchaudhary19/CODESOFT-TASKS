import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Quiz Maker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
