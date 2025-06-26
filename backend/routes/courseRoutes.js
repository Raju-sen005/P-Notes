import express from "express";
import Course from "../models/Course.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Add a new course (Admin only)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new Course({ title, description });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create course" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch courses" });
  }
});
// Update course
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update course" });
  }
});

// Delete course
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete course" });
  }
});


// ✅ पहले /by-subject route
router.get("/by-subject", verifyToken, async (req, res) => {
  const subjectName = req.query.subject;
  if (!subjectName) return res.status(400).json({ message: "Subject is required" });

  try {
    const course = await Course.findOne({ title: subjectName });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const quizzes = await Quiz.find({ courseId: course._id });
    res.json(quizzes);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Failed to fetch quizzes by subject" });
  }
});

// ✅ फिर /:id वाला route
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch course" });
  }
});


export default router;