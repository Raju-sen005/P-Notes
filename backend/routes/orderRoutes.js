import express from "express";
import Order from "../models/Order.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// User places an order with details
router.post("/", verifyToken, async (req, res) => {
  const { bookId, name, mobile, address } = req.body;
  if (!bookId || !name || !mobile || !address) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const order = new Order({
      userId: req.user.id,
      bookId,
      name,
      mobile,
      address,
      status: "Pending",
      orderedAt: new Date(),
    });

    await order.save();
    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ msg: "Failed to place order" });
  }
});

// User gets their own orders
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("bookId", "title price")
      .sort({ orderedAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch user orders error:", err);
    res.status(500).json({ msg: "Failed to fetch your orders" });
  }
});

// Admin: Get all orders with user & book info
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("bookId", "title price")
      .sort({ orderedAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch all orders error:", err);
    res.status(500).json({ msg: "Failed to fetch all orders" });
  }
});

export default router;