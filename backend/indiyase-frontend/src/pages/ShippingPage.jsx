import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const navigate = useNavigate();
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("checkoutInfo"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cartItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

    setCheckoutInfo(info || {});
    setCart(cartItems);
    setTotal(totalAmount);
  }, []);

  const handleContinue = () => {
    navigate("/payment");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 max-w-6xl mx-auto">
      {/* LEFT: Contact + Shipping Summary */}
      <div>
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <div className="border p-3 rounded mb-4 flex justify-between items-center">
          <span>{checkoutInfo.email}</span>
          <button className="text-blue-600 text-sm" onClick={() => navigate("/checkout")}>
            Change
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Ship to</h2>
        <div className="border p-3 rounded mb-4 flex justify-between items-center">
          <span>
            {checkoutInfo.address}, {checkoutInfo.city}, {checkoutInfo.state},{" "}
            {checkoutInfo.pin}
          </span>
          <button className="text-blue-600 text-sm" onClick={() => navigate("/checkout")}>
            Change
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
        <div className="border p-3 rounded flex justify-between items-center">
          <span>Delivery Charges</span>
          <span className="font-semibold">FREE</span>
        </div>

        <div className="flex justify-between mt-6">
          <button className="text-gray-600 underline" onClick={() => navigate("/checkout")}>
            &larr; Return to information
          </button>
          <button
  onClick={() => navigate("/checkout/payment")}
  className="bg-black text-white px-6 py-2 rounded"
>
  Continue to payment
</button>


        </div>
      </div>

      {/* RIGHT: Cart Summary */}
      <div className="bg-gray-50 p-6 rounded shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} className="flex items-center gap-4 border-b pb-2">
            <img
              src={item.image || "/images/default.jpg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
            </div>
            <p>₹{item.price}</p>
          </div>
        ))}

        <div className="mt-6 border-t pt-4 text-sm">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
