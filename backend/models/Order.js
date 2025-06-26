import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Pending" },
  orderedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);