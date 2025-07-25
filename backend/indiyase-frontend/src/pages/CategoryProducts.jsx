// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const { categoryName } = useParams(); // <-- make sure App.jsx uses :categoryName
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/category/${encodeURIComponent(categoryName)}`
        );
        const json = await res.json();
        setProducts(json.data || json); // your controller returns { success, count, data }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryName) fetchProducts();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category: {categoryName}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
