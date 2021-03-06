const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
