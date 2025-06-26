import mongoose from 'mongoose';

const previousPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  year: String,
  pdfUrl: String,
  externalLink: String,
}, { timestamps: true });

export default mongoose.model('PreviousPaper', previousPaperSchema);