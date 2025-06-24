import express from "express";
import Book from "../models/Book.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Get all books (Public)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("courseId", "title");
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// ✅ Get single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("courseId", "title");
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).json({ msg: "Failed to fetch book" });
  }
});

// ✅ Get books by course ID
router.get("/course/:courseId", async (req, res) => {
  try {
    const books = await Book.find({ courseId: req.params.courseId }).populate("courseId", "title");
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books by course:", err);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// ✅ Delete a book by ID (Admin only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json({ msg: "Book deleted successfully", deletedBook });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ msg: "Failed to delete book" });
  }
});

export default router;
