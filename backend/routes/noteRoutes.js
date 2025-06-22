import express from "express";
import fs from "fs";
import path from "path";
import Note from "../models/Note.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
// (If you're also using file-upload middleware elsewhere, keep it imported)
// import upload from "../upload.js";

const router = express.Router();

/**
 * 📥 Route: Force-download a PDF from uploads folder
 * GET /download/:filename
 */
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve("uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ msg: "File not found" });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(err.status || 500).json({ msg: "Error downloading file" });
    }
  });
});

/**
 * ✅ Route: Get all notes
 * GET /
 */
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch all notes error:", err);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

/**
 * 🔍 Route: Get one note by ID
 * GET /:id
 */
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    console.error("Fetch note by ID error:", err);
    res.status(500).json({ msg: "Failed to fetch note" });
  }
});

/**
 * 🗑️ Route: Delete note by ID (Admin only)
 * DELETE /:id
 */
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Optionally delete associated PDF file
    if (deleted.pdfUrl) {
      const pdfFile = path.basename(deleted.pdfUrl);
      const filePath = path.resolve("uploads", pdfFile);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete PDF:", err);
      });
    }

    res.status(200).json({ msg: "Note deleted", deleted });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ msg: "Failed to delete note" });
  }
});

/**
 * 📚 Route: Get notes by Course ID
 * GET /course/:courseId
 */
router.get("/course/:courseId", async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.courseId });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch notes by course error:", err);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

export default router;

