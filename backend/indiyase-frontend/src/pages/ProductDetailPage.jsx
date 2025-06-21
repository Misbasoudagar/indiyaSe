import React from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();

  // Sample static product data
  const product = {
    id,
    name: "Sample Product " + id,
    price: 199,
    description: "This is a high-quality product from IndiyaSe."
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ₹{product.price}</p>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetailPage;
