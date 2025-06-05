import express from "express";
import Order from "../models/Order.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// User places an order
router.post("/", verifyToken, async (req, res) => {
  const { bookId } = req.body;
  try {
    const order = new Order({ userId: req.user.id, bookId });
    await order.save();
    res.status(201).json({ msg: "Order placed", order });
  } catch (err) {
    res.status(500).json({ msg: "Failed to place order" });
  }
});

// Get my orders
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("bookId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
});

// Admin: Get all orders
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("bookId", "title");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch all orders" });
  }
});

export default router;