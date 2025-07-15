const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
  rating: { type: Number },
  images: [{ type: String }],
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);