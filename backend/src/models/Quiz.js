import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length === 4,
      message: "Each question must have exactly 4 options"
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
}, { _id: true });

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "Quiz must contain at least one question"
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
