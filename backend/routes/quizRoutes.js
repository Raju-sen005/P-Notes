import express from "express";
import Quiz from "../models/Quiz.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();
// ✅ Get all quizzes (for listing)
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch quizzes" });
  }
});

// Admin creates quiz
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { courseId, title, questions } = req.body;
  try {
    const quiz = new Quiz({ courseId, title, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create quiz" });
  }
});

// ✅ Get quiz by ID (admin/dashboard)
router.get("/id/:quizId", verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch quiz" });
  }
});
// Delete quiz by ID – Admin only
router.delete(
  "/:quizId",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const deleted = await Quiz.findByIdAndDelete(req.params.quizId);
      if (!deleted) {
        return res.status(404).json({ msg: "Quiz not found" });
      }
      res.status(200).json({ msg: "Quiz deleted successfully", deleted });
    } catch (err) {
      res.status(500).json({ msg: "Failed to delete quiz" });
    }
  }
);

// Get quiz by course
router.get("/:courseId", verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });
    if (!quiz) return res.status(404).json({ msg: "No quiz found" });

    // Hide correct answers when sending to user
    const quizForUser = {
      _id: quiz._id,
      title: quiz.title,
      courseId: quiz.courseId,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    };

    res.status(200).json(quizForUser);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch quiz" });
  }
});

// Attempt quiz
router.post("/attempt/:quizId", verifyToken, async (req, res) => {
  const { answers } = req.body; // [{ questionIndex: 0, selected: "Option A" }]
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    let score = 0;
    answers.forEach((ans, idx) => {
      if (quiz.questions[ans.questionIndex].correctAnswer === ans.selected) {
        score++;
      }
    });

    res.status(200).json({ score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ msg: "Failed to process quiz attempt" });
  }
});



export default router;
