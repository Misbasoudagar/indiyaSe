import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data.product || res.data); // depends on backend format
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image || "/images/default-product.jpg"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-700 mb-2">
  Category: {product.category}
  {product.subcategory && ` > ${product.subcategory}`}
</p>

          <p className="text-orange-600 text-2xl font-semibold mb-4">
            ₹{product.price}
          </p>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
