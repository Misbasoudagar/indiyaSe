const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Product description is required"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be at least 0"]
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: [
      "Women Ethnic",
      "Women Western",
      "Mens Wear",
      "Kids",
      "Electronics",
      "Beauty",
      "Grocery",
      "Home & Kitchen",
      "Jewellery",
      "Medicines",
      "Personal Care",
      "Health Devices"
    ]
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);