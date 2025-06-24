import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { verifyToken } from "../middlewares/auth.js";

import User from "../models/User.js";
import Course from "../models/Course.js";
import Note from "../models/Note.js";
import Quiz from "../models/Quiz.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";
import upload from "../middlewares/upload.js";
import Article from "../models/Article.js";
import SamplePaper from "../models/SamplePaper.js";
import PreviousPaper from '../models/PreviousPaper.js';
// import Test from '../models/Test.js'; // ✅ Test model import

// import SamplePaper from "../models/SamplePaper.js";

const router = express.Router();

/* ────────────────────── Admin‑only middleware ───────────────────── */
const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user?.role === "admin") return next();
    return res.status(403).json({ msg: "Access denied. Admins only." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Authorization failed." });
  }
};

/* ────────────────────── Auth & Stats ───────────────────── */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email और password ज़रूरी है" });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role !== "admin")
      return res.status(401).json({ msg: "Unauthorized access" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "गलत ईमेल या पासवर्ड" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/stats", verifyToken, verifyAdmin, async (_req, res) => {
  try {
    const [users, courses, notes, quizzes, books, orders] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Note.countDocuments(),
      Quiz.countDocuments(),
      Book.countDocuments(),
      Order.countDocuments(),
    ]);
    res.json({ users, courses, notes, quizzes, books, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch stats" });
  }
});

/* ────────────────────── Helpers ───────────────────── */
/**
 * Build a case‑insensitive $or regex query for provided fields
 */
const buildSearchQuery = (fields, search) => {
  if (!search || !fields.length) return {};  // अगर search नहीं या fields खाली तो खाली object लौटाओ
  const regex = new RegExp(search.trim(), "i");
  return { $or: fields.map((f) => ({ [f]: regex })) };
};



/**
 * Generic paginator helper
 */
const paginate = async ({
  Model,
  page = 1,
  limit = 10,
  search,
  searchFields = [],
  projection = null,
  populate = null,
  filter = {},
  sort = { createdAt: -1 },
}) => {
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.max(parseInt(limit) || 10, 1);
  const skip = (page - 1) * limit;

  const query = { ...filter, ...buildSearchQuery(searchFields, search) };

  const [total, data] = await Promise.all([
    Model.countDocuments(query),
    populate
      ? Model.find(query, projection).populate(populate).sort(sort).skip(skip).limit(limit)
      : Model.find(query, projection).sort(sort).skip(skip).limit(limit),
  ]);

  return {
    total,
    totalPages: Math.ceil(total / limit),
    page,
    limit,
    data,
  };
};

/* ────────────────────── USERS ───────────────────── */
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: User,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["name", "email"],
      projection: "name email role createdAt",
      sort: { createdAt: -1 },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.post("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "name, email, password are required" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ id: newUser._id, name, email, role });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user" });
  }
});

router.put("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
      select: "name email role",
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

/* ────────────────────── COURSES ───────────────────── */
router.get("/courses", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Course,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title"],
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

router.post("/courses", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const newCourse = await Course.create({ title, price, description });
    res.status(201).json(newCourse);
  } catch {
    res.status(500).json({ message: "Failed to add course" });
  }
});

router.put("/courses/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
});

router.delete("/courses/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
});

/* ────────────────────── BOOKS ───────────────────── */
router.get("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Book,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title", "author"],
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

router.post("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const newBook = await Book.create({ title, author, price });
    res.status(201).json(newBook);
  } catch {
    res.status(500).json({ message: "Failed to add book" });
  }
});

router.put("/books/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(500).json({ message: "Failed to update book" });
  }
});

router.delete("/books/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete book" });
  }
});

/* ────────────────────── NOTES ───────────────────── */
router.get("/notes", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Note,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title", "subject"],
      populate: { path: "course", select: "title" },
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

router.post(
  "/notes",
  verifyToken,
  verifyAdmin,
  upload.single("pdf"),
  async (req, res) => {
    try {
      const { title, subject, course } = req.body;
      if (!title || !course || !req.file)
        return res.status(400).json({ message: "title, course & pdf file are required" });

      const pdfUrl = `/uploads/${req.file.filename}`;
      const newNote = await Note.create({ title, subject, course, pdfUrl });
      res.status(201).json(newNote);
    } catch (err) {
      console.error("Add note error:", err.message);
      res.status(500).json({ message: "Failed to add note" });
    }
  }
);

// Update note (with optional new PDF)
router.put(
  "/notes/:id",
  verifyToken,
  verifyAdmin,
  upload.single("pdf"),
  async (req, res) => {
    try {
      const updates = req.body;
      if (req.file) {
        updates.pdfUrl = `/uploads/${req.file.filename}`;
      }
      const note = await Note.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      });
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.json(note);
    } catch {
      res.status(500).json({ message: "Failed to update note" });
    }
  }
);

router.delete("/notes/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

/* ────────────────────── QUIZZES ───────────────────── */
router.get("/quizzes", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Quiz,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["question"],
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
});

router.post("/quizzes", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    if (!courseId || !title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid quiz data" });
    }

    const newQuiz = await Quiz.create({ courseId, title, questions });
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error while adding quiz:", error);
    res.status(500).json({ message: "Failed to add quiz" });
  }
});


router.put("/quizzes/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch {
    res.status(500).json({ message: "Failed to update quiz" });
  }
});

router.delete("/quizzes/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete quiz" });
  }
});

/* ────────────────────── ORDERS (view only) ───────────────────── */
router.get("/orders", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Order,
      page: req.query.page,
      limit: req.query.limit,
      searchFields: [],
      search: req.query.search,
      populate: [
        { path: "userId", select: "name email" },
        { path: "bookId", select: "title price" }, // ✅ this was the fix
      ],
      sort: { createdAt: -1 },
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});


/* ────────────────────── ARTICLES ───────────────────── */
router.get("/articles", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: Article,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title", "author", "content"],
      sort: { createdAt: -1 },
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

router.post("/articles", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content are required" });

    const newArticle = await Article.create({ title, content, author, imageUrl });
    res.status(201).json(newArticle);
  } catch {
    res.status(500).json({ message: "Failed to add article" });
  }
});

router.put("/articles/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch {
    res.status(500).json({ message: "Failed to update article" });
  }
});

router.delete("/articles/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete article" });
  }
});

/* ────────────────────── SAMPLE PAPERS ───────────────────── */
router.get("/sample-papers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: SamplePaper,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title", "subject"],
      sort: { createdAt: -1 },
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch sample papers" });
  }
});

router.post("/sample-papers", verifyToken, verifyAdmin, upload.single("pdf"), async (req, res) => {
  try {
    const { title, subject, externalLink } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newSample = await SamplePaper.create({
      title,
      subject,
      pdfUrl,
      externalLink,
    });

    res.status(201).json(newSample);
  } catch (err) {
    console.error("Error adding sample paper:", err);
    res.status(500).json({ message: "Failed to add sample paper" });
  }
});

router.put("/sample-papers/:id", verifyToken, verifyAdmin, upload.single("pdf"), async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.pdfUrl = `/uploads/${req.file.filename}`;
    }

    const sample = await SamplePaper.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!sample) return res.status(404).json({ message: "Sample paper not found" });

    res.json(sample);
  } catch {
    res.status(500).json({ message: "Failed to update sample paper" });
  }
});

router.delete("/sample-papers/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await SamplePaper.findByIdAndDelete(req.params.id);
    res.json({ message: "Sample paper deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete sample paper" });
  }
});
/* ────────────────────── PREVIOUS PAPERS ───────────────────── */
router.get("/previous-papers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await paginate({
      Model: PreviousPaper,
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      searchFields: ["title", "description", "year"],
      sort: { createdAt: -1 },
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch previous papers" });
  }
});

router.post("/previous-papers", verifyToken, verifyAdmin, upload.single("pdf"), async (req, res) => {
  try {
    const { title, description, year, externalLink } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPaper = await PreviousPaper.create({
      title,
      description,
      year,
      pdfUrl,
      externalLink,
    });

    res.status(201).json(newPaper);
  } catch (err) {
    console.error("Error adding previous paper:", err);
    res.status(500).json({ message: "Failed to add previous paper" });
  }
});

router.put("/previous-papers/:id", verifyToken, verifyAdmin, upload.single("pdf"), async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.pdfUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await PreviousPaper.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Previous paper not found" });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update previous paper" });
  }
});

router.delete("/previous-papers/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await PreviousPaper.findByIdAndDelete(req.params.id);
    res.json({ message: "Previous paper deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete previous paper" });
  }
});




// CREATE Test
router.post("/", async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: "Failed to create test", details: err });
  }
});

// GET All Tests with Pagination and Search
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const tests = await Test.find(query)
      .populate("courseId", "title")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Test.countDocuments(query);

    res.json({
      data: tests,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ Error in GET /api/admin/tests:", err); // Add this
    res.status(500).json({ error: "Failed to fetch tests", details: err.message });
  }
});



// GET Single Test by ID
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("courseId", "title");
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch test", details: err });
  }
});

// UPDATE Test
router.put("/:id", async (req, res) => {
  try {
    // अगर payload में updatedAt था तो उसे हटा दो
    delete req.body.updatedAt;
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // updatedAt अपडेट और नया डॉक्यूमेंट वापस पाने के लिए ज़रूरी
    );
    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.json(updatedTest);
  } catch (err) {
    res.status(400).json({ error: "Failed to update test", details: err });
  }
});


// DELETE Test
router.delete("/:id", async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete test", details: err });
  }
});


export default router;
