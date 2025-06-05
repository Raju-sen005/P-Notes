import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);