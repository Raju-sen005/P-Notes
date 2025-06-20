// routes/previousPaperRoutes.js
import express from "express";
import PreviousPaper from "../models/PreviousPaper.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// POST: Add previous year paper
router.post("/", upload.single("pdfFile"), async (req, res) => {
  try {
    const { title, description, year } = req.body;
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const paper = new PreviousPaper({ title, description, pdfUrl, year });
    await paper.save();

    res.json({ message: "Previous Year Paper added", paper });
  } catch (error) {
    console.error("Error in adding previous paper:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET: Paginated previous papers
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  const total = await PreviousPaper.countDocuments(query);
  const papers = await PreviousPaper.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ total, papers });
});

export default router;
