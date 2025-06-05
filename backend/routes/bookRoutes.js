import express from "express";
import Book from "../models/Book.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Admin: Add book
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { title, description, price, coverImage, courseId } = req.body;
  try {
    const book = new Book({ title, description, price, coverImage, courseId });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add book" });
  }
});

// Get all books (public)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("courseId", "title");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

export default router;