import mongoose from "mongoose";

const samplePaperSchema = new mongoose.Schema({
  title: String,
  description: String,
  pdfUrl: String,       // for PDF file
  externalLink: String, // for external link
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("SamplePaper", samplePaperSchema);
