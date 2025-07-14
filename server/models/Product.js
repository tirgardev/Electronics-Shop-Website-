const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  price: Number,
  discount: Number,
  rating: Number,
  images: [String],
  description: String
});

module.exports = mongoose.model("Product", ProductSchema);
