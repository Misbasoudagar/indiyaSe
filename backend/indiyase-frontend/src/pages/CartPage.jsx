import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart } = useContext(CartContext);

  useEffect(() => {
    console.log("🧾 Cart contains:", cart);
  }, [cart]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} className="border p-2 my-2 rounded">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
