import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import OpenAI from "openai"; 

// AdminJS imports
import session from "express-session";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";  // 🔄 सही import

// Your route imports
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

dotenv.config();
const app = express();

// CORS & JSON parsing
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🛡️ Session setup for AdminJS (Login सुरक्षित रखने के लिए ज़रूरी)
app.use(session({
  secret: process.env.ADMIN_COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true },
}));

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

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


// 🛠️ AdminJS Integration
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});  // 🔄 Adapter registration correct तरीक़ा :contentReference[oaicite:1]{index=1}

const adminJs = new AdminJS({
  databases: [mongoose.connection],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) return { email };
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMIN_COOKIE_SECRET,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.ADMIN_COOKIE_SECRET,
    cookie: { httpOnly: true },
  }
);

app.use(adminJs.options.rootPath, adminRouter);

// ❌ 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// 🛑 Error Handler
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
