import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);
