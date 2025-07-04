const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config(); // Load .env variables here ✅

mongoose.connect(process.env.MONGO_URL)

  .then(() => {
    console.log("✅ Connected to MongoDB");
    return fixCategories();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

const categoryMap = {
  "women ethnic": "Women Ethnic",
  "women western": "Women Western",
  "men wears": "Men Wears",
  "kids": "Kids",
  "electronics": "Electronics",
  "beauty": "Beauty",
  "grocery": "Grocery",
  "home & kitchen": "Home & Kitchen",
  "jewellery": "Jewellery",
  "footwears": "Footwears",
  "books": "Books"
};

const fixCategories = async () => {
  try {
    const products = await Product.find({});
    let updatedCount = 0;

    for (const product of products) {
      const original = product.category?.toLowerCase().trim();

      for (const slug in categoryMap) {
        if (original?.includes(slug)) {
          product.category = slug; // save as lowercase slug
          await product.save();
          updatedCount++;
          break;
        }
      }
    }

    console.log(`✅ Updated ${updatedCount} product categories.`);
    process.exit();
  } catch (err) {
    console.error("❌ Failed to fix categories:", err);
    process.exit(1);
  }
};
