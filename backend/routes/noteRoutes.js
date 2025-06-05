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