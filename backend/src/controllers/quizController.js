import Quiz from "../models/Quiz.js";

export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title and at least one question are required"
      });
    }

    for (const question of questions) {
      if (
        !question.question?.trim() ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        question.options.some((option) => !option?.trim()) ||
        !Number.isInteger(question.correctAnswer) ||
        question.correctAnswer < 0 ||
        question.correctAnswer > 3
      ) {
        return res.status(400).json({
          success: false,
          message: "Each question needs text, four options and a valid correct answer"
        });
      }
    }

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find()
      .select("title description questions createdBy createdAt")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    const result = quizzes.map((quiz) => ({
      ...quiz.toObject(),
      questionCount: quiz.questions.length,
      questions: undefined
    }));

    res.json({ success: true, quizzes: result });
  } catch (error) {
    next(error);
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("createdBy", "name");

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
};
