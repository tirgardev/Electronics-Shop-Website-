const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware"); // ✅ JWT verification

// 📦 Route: Place a new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, shippingInfo } = req.body;

    if (!items || items.length === 0 || !shippingInfo) {
      return res.status(400).json({ message: "Missing order details." });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user.id, // ✅ JWT-based user ID
      items,
      shippingInfo,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("🚨 Order Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// 🧾 Route: Get all orders (admin/test use)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error("🚨 Fetch Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// 🧾 Route: Get current user's orders
router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("🚨 Fetch User Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

module.exports = router;
