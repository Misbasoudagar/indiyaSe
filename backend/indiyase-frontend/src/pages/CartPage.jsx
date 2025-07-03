import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook for navigation

  // Total price calculation
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  // Update quantity (+ / -)
  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, (updatedCart[index].quantity || 1) + delta);
    setCart(updatedCart);
  };

  // Remove item
  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to checkout page
  };

  useEffect(() => {
    console.log("🛒 Updated Cart:", cart);
  }, [cart]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty. <a href="/" className="text-blue-600 underline">Continue shopping</a></div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, i) => (
            <div key={i} className="flex items-center justify-between border p-4 rounded shadow-sm">
              {/* Image */}
              <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-16 h-16 object-cover rounded" />

              {/* Info */}
              <div className="flex-1 px-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(i, -1)} className="px-2 border rounded">-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(i, 1)} className="px-2 border rounded">+</button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(i)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button
              className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;