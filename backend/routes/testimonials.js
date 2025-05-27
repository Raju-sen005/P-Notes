// routes/testimonials.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { message: "Awesome notes!", name: "Rahul", tag: "MBA Student" },
  ]);
});

export default router;
