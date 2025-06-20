import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Order", OrderSchema);
