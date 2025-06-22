import express from "express";
import Note from "../models/Note.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Upload note (PDF) – Admin only
router.post("/upload", verifyToken, isAdmin, async (req, res) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { title, course, subject } = req.body;
  const pdf = req.files.pdf;
  const filename = Date.now() + "_" + pdf.name;
  const uploadPath = path.join("uploads", filename);

  try {
    pdf.mv(uploadPath, async (err) => {
      if (err) return res.status(500).json({ msg: "File upload failed" });
      const newNote = new Note({ title, course, subject, pdfUrl: `/uploads/${filename}` });
      await newNote.save();
      res.status(201).json(newNote);
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to upload note" });
  }
});
// 📥 Force download PDF
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve("uploads", filename); // Absolute path to file

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ msg: "File not found" });
  }

  // Set headers and send file
  res.set({
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Type": "application/pdf",
  });

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file.");
    }
  });
});

// ✅ नया route - सारे notes लाने के लिए
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

// Get note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch note" });
  }
});
// Delete note by ID – Admin only
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Note not found" });
    }
    // Optionally delete PDF file too
    const filePath = path.resolve("uploads", path.basename(deleted.pdfUrl));
    fs.unlink(filePath, err => {
      if (err) console.warn("Failed to delete PDF:", err);
    });
    res.status(200).json({ msg: "Note deleted", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete note" });
  }
});

// Get notes by course
router.get("/course/:courseId", async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.courseId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

export default router;
