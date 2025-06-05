import express from "express";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Note from "../models/Note.js";
import Quiz from "../models/Quiz.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const views = await Order.countDocuments(); // ya real views logic agar ho
    const subscribers = await User.countDocuments();
    const videos = await Course.countDocuments();
    const questions = await Quiz.countDocuments();
    const notes = await Note.countDocuments();

    res.json({
      views,
      subscribers,
      videos,
      questions,
      notes,
    });
  } catch (err) {
    console.error("Stats fetch error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;