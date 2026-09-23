import { Router } from "express";
import { createQuiz, getQuizById, getQuizzes } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/", protect, createQuiz);

export default router;
