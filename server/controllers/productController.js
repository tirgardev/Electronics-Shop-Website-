const Product = require("../models/Product");

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Fetch all products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ✅ Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Fetch product by ID error:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// ✅ Add a new product
exports.addProduct = async (req, res) => {
  try {
    let {
      name,
      category,
      brand,
      price,
      discount,
      rating,
      images,
      description
    } = req.body;

    // ✅ Validate required fields
    if (!name || !category || !brand || !price) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // ✅ Parse numeric fields
    price = parseFloat(price);
    discount = discount ? parseFloat(discount) : 0;
    rating = rating ? parseFloat(rating) : 0;

    // ✅ Parse images to array if it's a comma-separated string
    if (typeof images === "string") {
      images = images.split(",").map((url) => url.trim());
    }

    const newProduct = new Product({
      name,
      category: category.toLowerCase(), // normalize to lowercase
      brand,
      price,
      discount,
      rating,
      images,
      description,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};
