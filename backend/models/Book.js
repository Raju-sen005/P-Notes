import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  coverImage: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" } // ✅ ये line active करें
});

export default mongoose.model("Book", bookSchema);