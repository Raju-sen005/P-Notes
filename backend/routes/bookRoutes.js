import express from "express";
import Book from "../models/Book.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// // ✅ Admin: Add a book
// router.get("/", verifyToken, isAdmin, async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   try {
//     const total = await Order.countDocuments(); // कुल orders की गिनती
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .populate("bookId", "title price")
//       .sort({ orderedAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.status(200).json({
//       total,
//       page,
//       limit,
//       orders,
//     });
//   } catch (err) {
//     console.error("Fetch all orders error:", err);
//     res.status(500).json({ msg: "Failed to fetch all orders", error: err.message });
//   }
// });


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

export default router;
