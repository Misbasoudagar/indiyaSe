import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, (updatedCart[index].quantity || 1) + delta);
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    console.log("🛒 Updated Cart:", cart);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty. <a href="/" className="text-orange-500 underline">Continue Shopping</a>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {cart.map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white shadow rounded-lg p-4">
              <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-20 rounded-lg object-cover border" />

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</h4>
                <p className="text-gray-500 text-sm">Price: ₹{item.price}</p>
                <p className="text-gray-700 text-sm font-medium">Subtotal: ₹{item.price * (item.quantity || 1)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(i, -1)} className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-lg font-bold">-</button>
                <span className="font-semibold text-gray-800">{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(i, 1)} className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-lg font-bold">+</button>
              </div>

              <button onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700 ml-4">
                <FaTrashAlt />
              </button>
            </div>
          ))}

          <div className="sticky bottom-0 bg-white shadow-inner rounded-lg p-4 mt-8 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-800">Total: ₹{total}</p>
            <button onClick={handleCheckout} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
