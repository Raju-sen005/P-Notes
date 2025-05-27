import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  subject: { type: String },
  pdfUrl: { type: String, required: true },
});

export default mongoose.model("Note", noteSchema);