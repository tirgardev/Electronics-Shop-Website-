const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");
const Product = require("../models/Product");

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Fetch all products
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 */
router.get("/:id", getProductById);

/**
 * @route   POST /api/products/add
 * @desc    Add a new product (requires auth)
 */
router.post("/add", verifyToken, addProduct);

/**
 * @route   GET /api/products/category/:name
 * @desc    Get all products under a specific category
 */
router.get("/category/:name", async (req, res) => {
  try {
    const category = req.params.name.toLowerCase();

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") }, // Case-insensitive match
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Category fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch category products" });
  }
});

module.exports = router;
