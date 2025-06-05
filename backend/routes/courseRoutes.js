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

export default router;