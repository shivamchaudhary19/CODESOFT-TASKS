import Job from "../models/Job.js";

export async function listJobs(req, res) {
  const { search = "", location = "", category = "", type = "" } = req.query;
  const filter = { status: "open" };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (category) filter.category = { $regex: category, $options: "i" };
  if (type) filter.type = type;
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { company: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
    { skills: { $regex: search, $options: "i" } }
  ];
  const jobs = await Job.find(filter).populate("employer", "name companyName").sort({ createdAt: -1 });
  res.json({ success: true, jobs });
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate("employer", "name companyName email");
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, job });
}

export async function createJob(req, res) {
  const { title, company, location, category, type, salary, description, skills = [], requirements = [] } = req.body;
  if (!title || !company || !location || !category || !type || !description) return res.status(400).json({ success: false, message: "Title, company, location, category, type and description are required" });
  const job = await Job.create({ title, company, location, category, type, salary, description, skills, requirements, employer: req.user._id });
  res.status(201).json({ success: true, message: "Job posted", job });
}

export async function updateJob(req, res) {
  const job = await Job.findOne({ _id: req.params.id, employer: req.user._id });
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  Object.assign(job, req.body);
  await job.save();
  res.json({ success: true, message: "Job updated", job });
}

export async function deleteJob(req, res) {
  const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, message: "Job deleted" });
}

export async function employerJobs(req, res) {
  const jobs = await Job.find({ employer: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, jobs });
}
