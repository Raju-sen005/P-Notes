// routes/notesRoutes.js
import express from "express";
import Note from "../models/Note.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";

const router = express.Router();

// Use middleware for file upload
router.use(fileUpload({ createParentPath: true, limits: { fileSize: 50 * 1024 * 1024 } }));

// ✅ Upload note (PDF) – Admin only
router.post("/upload", verifyToken, isAdmin, async (req, res) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { title, course, subject } = req.body;
  const pdf = req.files.pdf;
  const filename = Date.now() + "_" + pdf.name;
  const uploadDir = path.join(process.cwd(), "uploads");
  const uploadPath = path.join(uploadDir, filename);

  try {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    await pdf.mv(uploadPath);
    const newNote = new Note({ title, course, subject, pdfUrl: `/uploads/${filename}` });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ msg: "Failed to upload note" });
  }
});

// ✅ List all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch notes error:", err);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

// ✅ Get note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    console.error("Fetch note error:", err);
    res.status(500).json({ msg: "Failed to fetch note" });
  }
});

// ✅ Get notes by course
router.get("/course/:courseId", async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.courseId });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch course notes error:", err);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

// ✅ Download a saved PDF
router.get("/download/:filename", (req, res) => {
  const filePath = path.resolve("uploads", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ msg: "File not found" });
  res.download(filePath, req.params.filename, err => {
    if (err) console.error("Error sending file:", err);
  });
});

// ✅ DELETE a note – Admin only
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    // Remove associated PDF file
    const filePath = path.join(process.cwd(), note.pdfUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await note.deleteOne();
    res.status(200).json({ msg: "Note and PDF deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ msg: "Failed to delete note" });
  }
});

export default router;
