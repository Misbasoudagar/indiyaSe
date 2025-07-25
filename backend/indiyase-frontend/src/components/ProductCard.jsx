import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    addToCart(product);
    // Optional: Redirect to checkout
  };

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `${import.meta.env.VITE_API_BASE}/${product.image}`;

  // Calculate discount percentage if MRP is available
  const discount =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col">
      {/* Discount badge or Sold Out */}
      {product.countInStock === 0 ? (
        <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded-md">
          Sold Out
        </span>
      ) : discount ? (
        <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded-md">
          -{discount}% Off
        </span>
      ) : null}

      <img
        src={imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-3"
      />

      <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>

      {product.brand && (
        <p className="text-xs text-gray-500 mb-1 uppercase">{product.brand}</p>
      )}

      <div className="mb-2 text-sm text-gray-600 line-clamp-2">
        {product.description?.replace(/<[^>]+>/g, '')}
      </div>

      <div className="mt-auto">
        <div className="text-md font-semibold text-gray-700">
          {product.mrp && product.mrp !== product.price && (
            <span className="line-through text-gray-400 mr-2">₹{product.mrp}</span>
          )}
          <span className="text-orange-600 text-xl font-bold">₹{product.price}</span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addToCart(product)}
            disabled={product.countInStock === 0}
            className={`flex-1 py-2 rounded-md text-white ${
              product.countInStock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.countInStock === 0}
            className={`flex-1 py-2 rounded-md text-white ${
              product.countInStock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
