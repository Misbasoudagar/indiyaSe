const fs = require("fs");
const path = require("path");

// Load original file
const filePath = path.join(__dirname, "products_export.json");
let products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

let fixedCount = 0;

// Check and fix description
products = products.map((product, index) => {
  if (
    !product.description ||
    typeof product.description !== "string" ||
    product.description.trim() === ""
  ) {
    product.description = `No description available for product ${product.title || `#${index + 1}`}`;
    fixedCount++;
  }
  return product;
});

// Save the updated file
fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
console.log(`✅ Fixed ${fixedCount} product descriptions and saved to products_export.json`);
