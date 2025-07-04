import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    addToCart(product);
    // add checkout redirection if required
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4 flex flex-col">
      <img
        src={product.image || 'https://via.placeholder.com/300'}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-2">
        {product.description.replace(/<[^>]+>/g, '')}
      </p>
      <div className="mt-auto">
        <p className="text-xl font-bold text-orange-600">₹{product.price}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
