import express from 'express';
import SamplePaper from '../models/SamplePaper.js';
import upload from '../middlewares/upload.js'; // multer middleware for file upload

const router = express.Router();

// Admin adds a new sample paper
router.post("/", upload.single("pdfFile"), async (req, res) => {
  const { title, description, externalLink } = req.body;
  const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const samplePaper = new SamplePaper({ title, description, pdfUrl, externalLink });
  await samplePaper.save();

  res.json({ message: "Sample paper added", samplePaper });
});

// Fetch all sample papers
router.get("/", async (req, res) => {
   try {
    const papers = await SamplePaper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch {
    res.status(500).json({ message: "Failed to load sample papers" });
  }
});

export default router;
