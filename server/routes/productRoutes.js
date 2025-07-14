const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/add", verifyToken, addProduct);

module.exports = router; // ✅ This is critical
