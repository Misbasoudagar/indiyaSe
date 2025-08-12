// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const slugToUse = subcategorySlug || categorySlug;
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${slugToUse}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category products", err);
      }
    };

    fetchByCategory();
  }, [categorySlug, subcategorySlug]);

  return (
    <div className="w-full bg-white py-4">
      <h2 className="text-2xl font-bold capitalize text-center mb-6">
        Category: {(subcategorySlug || categorySlug).replace("-", " ")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-700">₹{product.price}</p>
              <div className="mt-2 flex gap-2">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm rounded">
                  Add to Cart
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
