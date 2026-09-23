import { Router } from "express";
import multer from "multer";
import { protect, requireRole } from "../middleware/auth.js";
import { apply, myApplications, employerApplications, updateApplication, downloadResume } from "../controllers/applicationController.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => {
  const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  cb(null, allowed.includes(file.mimetype));
} });
router.post("/jobs/:jobId", protect, requireRole("candidate"), upload.single("resume"), apply);
router.get("/mine", protect, requireRole("candidate"), myApplications);
router.get("/employer", protect, requireRole("employer"), employerApplications);
router.patch("/:id", protect, requireRole("employer"), updateApplication);
router.get("/:id/resume", protect, requireRole("employer"), downloadResume);
export default router;
