const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    images: { type: Array, required: true },
    InStock: { type: Number, required: true },
    bestSeller: { type: Boolean, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
