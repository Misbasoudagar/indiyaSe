// backend/seeds/seedShopifyProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Product = require("../models/productModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    importProducts();
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });

async function importProducts() {
  try {
    const filePath = path.join(__dirname, "products_export.json");
    const rawData = fs.readFileSync(filePath);
    const products = JSON.parse(rawData);

    const formatted = products
      .filter((p) => p["Title"])
      .map((p) => ({
        name: p["Title"],
        description: p["Body (HTML)"],
        price: parseFloat(p["Variant Price"]) || 0,
        comparePrice: parseFloat(p["Variant Compare At Price"]) || 0,
        image: p["Image Src"],
        category: p["Type"] || "Other",
        tags: p["Tags"]?.split(",").map((tag) => tag.trim()) || [],
        vendor: p["Vendor"] || "unknown",
      }));

    await Product.deleteMany();
    console.log("Old products cleared.");

    await Product.insertMany(formatted);
    console.log("Shopify products imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Failed to import products:", err);
    process.exit(1);
  }
}
