import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const ThankYouPage = () => {
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("checkoutInfo")) || {};
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCheckoutInfo(info);
    setCart(items);
    setConfirmationNumber(
      "ORDER" + Math.floor(100000 + Math.random() * 900000)
    );
    localStorage.removeItem("cart");
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-white flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl border border-gray-200 rounded-lg shadow-md">
        <div className="border-b bg-gray-50 px-6 py-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Order Confirmed</h1>
          <p className="text-sm text-gray-500 mt-1">
            Confirmation #{confirmationNumber}
          </p>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <FiCheckCircle className="mx-auto text-green-500 text-4xl mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Thank you, {checkoutInfo.firstName}!
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Your order has been placed successfully. A confirmation email has been sent to {checkoutInfo.email}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded p-4">
              <h3 className="text-gray-800 font-semibold mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">
                {checkoutInfo.firstName} {checkoutInfo.lastName}<br />
                {checkoutInfo.address}, {checkoutInfo.apartment && checkoutInfo.apartment + ", "}
                {checkoutInfo.city}, {checkoutInfo.state} - {checkoutInfo.pinCode}<br />
                Phone: {checkoutInfo.phone}<br />
                Email: {checkoutInfo.email}
              </p>
            </div>

            <div className="border rounded p-4">
              <h3 className="text-gray-800 font-semibold mb-2">Payment & Summary</h3>
              <p className="text-sm text-gray-600">
                Payment Method: Cash on Delivery<br />
                Delivery Charges: FREE<br />
                Subtotal: ₹{total.toFixed(2)}<br />
                <span className="font-semibold text-black text-md">
                  Total: ₹{total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 text-center text-xs text-gray-400 py-4 border-t">
          &copy; {new Date().getFullYear()} Indiyase. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
