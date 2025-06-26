import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - save message to DB
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error("Error saving contact:", err.message);
    res.status(500).json({ success: false, message: "Failed to save message" });
  }
});

export default router;