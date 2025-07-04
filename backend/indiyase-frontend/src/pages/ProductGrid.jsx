import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const ProductGrid = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, [category]);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 capitalize">{category} Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
