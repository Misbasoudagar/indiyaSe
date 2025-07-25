// src/pages/CollectionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CollectionPage = () => {
  const { category } = useParams(); // category can be "all" or undefined
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${import.meta.env.VITE_API_BASE}/api/products`;


        // If category exists and isn't "all", filter by it
        if (category && category !== "all") {
          url += `?category=${category}`;
        }

        const res = await axios.get(url);
        setProducts(res.data.products || res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold capitalize mb-6">
        {category === "all" || !category
          ? "All Products"
          : category.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow p-3 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-medium">{product.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-green-600 font-bold mr-2">
                    ₹{product.discountPrice}
                  </span>
                  <span className="line-through text-gray-500">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded mt-1 inline-block">
                  {Math.round(
                    ((product.originalPrice - product.discountPrice) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
                <button className="mt-3 bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
