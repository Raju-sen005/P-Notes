// testimonials.js
import express from "express";
import Testimonial from '../models/Testimonials.js';


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.post("/", async (req, res) => {
  const { name, tag, message } = req.body;
  if (!name || !tag || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    const newTestimonial = new Testimonial({ name, tag, message });
    await newTestimonial.save();
    res.status(201).json({ success: true, message: "Testimonial saved." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
