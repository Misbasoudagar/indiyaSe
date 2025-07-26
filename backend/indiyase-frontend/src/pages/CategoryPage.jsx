// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category products", err);
      }
    };
    fetchByCategory();
  }, [categoryName]);

  return (
    <div className="w-full">
      <div className="w-full bg-white py-4 px-2">
        <h2 className="text-2xl font-bold capitalize text-center mb-6">
          {categoryName.replace("-", " ")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 sm:px-4 md:px-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-700">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
