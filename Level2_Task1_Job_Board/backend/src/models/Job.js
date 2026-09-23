import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"], required: true },
  salary: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
  skills: [{ type: String, trim: true }],
  requirements: [{ type: String, trim: true }],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" }
}, { timestamps: true });

jobSchema.index({ title: "text", company: "text", description: "text", category: "text", skills: "text" });

export default mongoose.model("Job", jobSchema);
