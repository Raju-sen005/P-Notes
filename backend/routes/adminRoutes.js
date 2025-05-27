import express from "express";
import { verifyToken } from "../middlewares/auth.js";

import User from "../models/User.js";
import Course from "../models/Course.js";
import Note from "../models/Note.js";
import Quiz from "../models/Quiz.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

const router = express.Router();

// Middleware to allow only admin
const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Authorization failed." });
  }
};

// Stats route: accessible only to admin
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const courses = await Course.countDocuments();
    const notes = await Note.countDocuments();
    const quizzes = await Quiz.countDocuments();
    const books = await Book.countDocuments();
    const orders = await Order.countDocuments();

    res.status(200).json({
      users,
      courses,
      notes,
      quizzes,
      books,
      orders,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stats" });
  }
});

export default router;
