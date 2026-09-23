import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { sendNotification } from "../services/emailService.js";

export async function apply(req, res) {
  const job = await Job.findById(req.params.jobId).populate("employer", "name companyName email");
  if (!job || job.status !== "open") return res.status(404).json({ success: false, message: "Job is not available" });
  if (await Application.findOne({ job: job._id, candidate: req.user._id })) return res.status(409).json({ success: false, message: "You have already applied to this job" });
  const file = req.file;
  if (!file) return res.status(400).json({ success: false, message: "Resume is required" });
  if (file.size > 5 * 1024 * 1024) return res.status(400).json({ success: false, message: "Resume must be 5 MB or smaller" });
  const application = await Application.create({ job: job._id, candidate: req.user._id, coverLetter: req.body.coverLetter || "", resume: { data: file.buffer, contentType: file.mimetype, originalName: file.originalname } });
  await sendNotification({ to: job.employer.email, subject: `New application for ${job.title}`, text: `${req.user.name} applied for ${job.title} at ${job.company}. Log in to review the application.` });
  await sendNotification({ to: req.user.email, subject: `Application submitted: ${job.title}`, text: `Your application for ${job.title} at ${job.company} has been submitted successfully.` });
  res.status(201).json({ success: true, message: "Application submitted", application: { id: application._id, status: application.status } });
}

export async function myApplications(req, res) {
  const applications = await Application.find({ candidate: req.user._id }).select("-resume.data").populate("job", "title company location type salary").sort({ createdAt: -1 });
  res.json({ success: true, applications });
}

export async function employerApplications(req, res) {
  const applications = await Application.find().select("-resume.data").populate({ path: "job", match: { employer: req.user._id }, select: "title company" }).populate("candidate", "name email headline skills location").sort({ createdAt: -1 });
  res.json({ success: true, applications: applications.filter(a => a.job) });
}

export async function updateApplication(req, res) {
  const application = await Application.findById(req.params.id).populate("job", "title company employer").populate("candidate", "name email");
  if (!application || String(application.job.employer) !== String(req.user._id)) return res.status(404).json({ success: false, message: "Application not found" });
  const allowed = ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid application status" });
  application.status = req.body.status;
  await application.save();
  await sendNotification({ to: application.candidate.email, subject: `Application update: ${application.job.title}`, text: `Your application status for ${application.job.title} at ${application.job.company} is now: ${application.status}.` });
  res.json({ success: true, message: "Application status updated", status: application.status });
}

export async function downloadResume(req, res) {
  const application = await Application.findById(req.params.id).populate("job", "employer");
  if (!application || String(application.job.employer) !== String(req.user._id) || !application.resume?.data) return res.status(404).json({ success: false, message: "Resume not found" });
  res.setHeader("Content-Type", application.resume.contentType || "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(application.resume.originalName || "resume")}"`);
  res.send(application.resume.data);
}
