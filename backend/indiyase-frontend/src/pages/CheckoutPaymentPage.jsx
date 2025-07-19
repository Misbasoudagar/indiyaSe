import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [billingAddressSame, setBillingAddressSame] = useState(true);
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("checkoutInfo")) || {};
    setCheckoutInfo(info);

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const total = subtotal;

  const shippingAddress = `${checkoutInfo.address || ""}${
    checkoutInfo.apartment ? ", " + checkoutInfo.apartment : ""
  }, ${checkoutInfo.city || ""}, ${checkoutInfo.state || ""}, ${
    checkoutInfo.pinCode || ""
  }`;

  const contactDisplay = `${checkoutInfo.email || ""} / ${
    checkoutInfo.phone || ""
  }`;

  const handlePayNow = async () => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo")) || {};
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  
    const res = await fetch("http://localhost:5000/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount,
      }),
    });
  
    const data = await res.json();
  
    if (data.id) {
      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Indiyase",
        description: "Order Payment",
        handler: function (response) {
          alert("✅ Payment successful: " + response.razorpay_payment_id);
          localStorage.removeItem("cart");
          window.location.href = "/thankyou";
        },
        prefill: {
          name: `${checkoutInfo.firstName} ${checkoutInfo.lastName}`,
          email: checkoutInfo.email,
          contact: checkoutInfo.phone,
        },
        theme: {
          color: "#0f172a",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert("❌ Failed to create Razorpay order");
    }
  };
  

  return (
    <div className="min-h-screen bg-white grid md:grid-cols-3 max-w-7xl mx-auto pt-8">
      {/* LEFT SIDE */}
      <div className="md:col-span-2 px-6">
        <h2 className="text-xl font-bold mb-4">Payment</h2>

        <div className="border p-4 rounded text-sm mb-6 space-y-2 bg-gray-50">
          <div className="flex justify-between">
            <div><strong>Contact:</strong> {contactDisplay}</div>
            <button className="text-blue-600 text-sm underline" onClick={() => navigate("/checkout")}>Change</button>
          </div>
          <div className="flex justify-between">
            <div><strong>Ship to:</strong> {shippingAddress}</div>
            <button className="text-blue-600 text-sm underline" onClick={() => navigate("/checkout")}>Change</button>
          </div>
          <div className="flex justify-between">
            <div><strong>Shipping method:</strong> Delivery charges - FREE</div>
            <button className="text-blue-600 text-sm underline">Change</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            Show your support for the team at Indiyase
          </label>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Payment</h3>
          <p className="text-xs text-gray-500 mb-2">
            All transactions are secure and encrypted.
          </p>

          <div className="border rounded overflow-hidden">
            <label className="flex items-center p-3 border-b">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
                className="mr-2"
              />
              Razorpay Secure (UPI, Cards, Wallets, NetBanking)
            </label>
            <label className="flex items-center p-3">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mr-2"
              />
              Cash on Delivery (COD)
            </label>
          </div>
        </div>

        <div className="mb-6">
  <h3 className="font-semibold mb-2">Billing address</h3>

  <label className="block text-sm mb-2">
    <input
      type="radio"
      name="billing"
      checked={billingAddressSame}
      onChange={() => setBillingAddressSame(true)}
      className="mr-2"
    />
    Same as shipping address
  </label>

  <label className="block text-sm">
    <input
      type="radio"
      name="billing"
      checked={!billingAddressSame}
      onChange={() => setBillingAddressSame(false)}
      className="mr-2"
    />
    Use a different billing address
  </label>

  {!billingAddressSame && (
    <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="First name" className="border p-2 rounded" />
        <input type="text" placeholder="Last name" className="border p-2 rounded" />
      </div>
      <input type="text" placeholder="Address" className="border p-2 rounded w-full" />
      <input type="text" placeholder="Apartment, suite, etc. (optional)" className="border p-2 rounded w-full" />
      <div className="grid grid-cols-3 gap-4">
        <input type="text" placeholder="City" className="border p-2 rounded" />
        <input type="text" placeholder="State" className="border p-2 rounded" />
        <input type="text" placeholder="PIN code" className="border p-2 rounded" />
      </div>
      <input type="text" placeholder="Phone (optional)" className="border p-2 rounded w-full" />
    </div>
  )}
</div>

{paymentMethod === "razorpay" ? (
  <button
    onClick={handlePayNow}
    className="w-full bg-black text-white py-3 rounded text-sm font-medium"
  >
    Pay now
  </button>
) : (
  <button
    onClick={() => {
      alert("✅ Order placed with Cash on Delivery");
      localStorage.removeItem("cart");
      window.location.href = "/thankyou";
    }}
    className="w-full bg-black text-white py-3 rounded text-sm font-medium"
  >
    Complete order
  </button>
)}


        <button onClick={() => navigate("/checkout/shipping")} className="mt-4 text-sm text-blue-600 underline">
          ← Return to shipping
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-100 p-6">
        <div className="space-y-4 text-sm">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name} × {item.quantity || 1}</span>
              <span>₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
