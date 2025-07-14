const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.addProduct = async (req, res) => {
  const { name, category, brand, price, discount, rating, images, description } = req.body;
  try {
    const product = new Product({
      name,
      category,
      brand,
      price,
      discount,
      rating,
      images,
      description,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};