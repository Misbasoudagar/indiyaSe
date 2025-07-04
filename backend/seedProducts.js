// seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import fs from "fs";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing products
    await Product.deleteMany();

    // Load data from JSON
    const products = JSON.parse(fs.readFileSync("./products_export_1.json", "utf-8"));

    // Insert into DB
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
    process.exit(1);
  }
};

seedProducts();
