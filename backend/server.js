import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// import OpenAI from "openai"; 

// Route imports
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testimonialsRouter from "./routes/testimonials.js";
import statsRoutes from "./routes/statsRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import samplePaperRoutes from "./routes/samplePaperRoutes.js";
import previousPaperRoutes from "./routes/previousPaperRoutes.js";
// import testRoutes from "./routes/testRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔌 MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🌐 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/stats", statsRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sample-papers", samplePaperRoutes);
app.use("/api/previous-papers", previousPaperRoutes);
// app.use("/api/tests", testRoutes);

// 🤖 OpenAI Setup
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// 🤖 AI Question Answering Endpoint
// app.post("/api/ask", async (req, res) => {
//   const { question } = req.body;
//   if (!question) return res.status(400).json({ msg: "Question is required" });

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: question }],
//     });

//     const answer = completion.choices[0].message.content;
//     res.json({ answer });
//   } catch (err) {
//     console.error("AI Error:", err.message);
//     res.status(500).json({ msg: "Failed to get answer from AI" });
//   }
// });

// 🏗️ Frontend static file serving (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend", "build")));

// ✅ React frontend routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// 🛑 Error handler (this will not override frontend routes)
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
