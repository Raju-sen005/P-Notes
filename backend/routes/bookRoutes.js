import express from "express";
import mongoose from "mongoose";
import Book from "../models/Book.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// 🛠️ Helper to validate ObjectId
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// ✅ Public: Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("courseId", "title");
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// ✅ Public: Get books by course
router.get("/course/:courseId", async (req, res) => {
  const { courseId } = req.params;
  if (!isValidId(courseId)) return res.status(400).json({ msg: "Invalid course ID" });

  try {
    const books = await Book.find({ courseId }).populate("courseId", "title");
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books by course:", err);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// ✅ Public: Get a single book by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: "Invalid book ID" });

  try {
    const book = await Book.findById(id).populate("courseId", "title");
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ msg: "Failed to fetch book" });
  }
});

// ✅ Admin: Add a new book
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(400).json({ msg: "Failed to create book", error: err.message });
  }
});

// ✅ Admin: Update an existing book
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: "Invalid book ID" });

  try {
    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(400).json({ msg: "Failed to update book", error: err.message });
  }
});

// ✅ Admin: Delete a book
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ msg: "Invalid book ID" });

  try {
    const removed = await Book.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json({ msg: "Book deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ msg: "Failed to delete book" });
  }
});

export default router;