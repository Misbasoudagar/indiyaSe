import React from "react";

function CartPage({ cart, removeFromCart, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ₹{total}</div>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white"
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
