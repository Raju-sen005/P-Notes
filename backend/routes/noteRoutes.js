import express from "express";
import fs from "fs";
import path from "path";
import Note from "../models/Note.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

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
// 📥 Force download PDF from URL or local file
router.get('/download', async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) return res.status(400).json({ msg: 'Missing URL parameter: ?url=' });

  try {
    // 📁 Local file route
    if (fileUrl.startsWith("/uploads/")) {
      const filename = path.basename(fileUrl);
      const filePath = path.join("uploads", filename);
      if (!fs.existsSync(filePath)) return res.status(404).json({ msg: "File not found" });
      return res.download(filePath, filename);
    }

    // 🛡️ Remote URL validation (example whitelist)
    if (!/^https?:\/\/(trusted-domain\.com|another\.com)\//i.test(fileUrl)) {
      return res.status(400).json({ msg: "Invalid URL" });
    }

    const response = await axios.get(fileUrl, {
      responseType: 'stream',
      timeout: 10000,
    });

    const filename = decodeURIComponent(fileUrl.split('/').pop()) || 'download.pdf';
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');

    response.data.pipe(res);
    response.data.on('error', err => {
      console.error('Stream error:', err);
      if (!res.headersSent) res.status(500).send('Stream error');
    });
  } catch (err) {
    console.error('Fetch/download error:', err);
    res.status(500).json({ msg: 'Failed to download file' });
  }
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