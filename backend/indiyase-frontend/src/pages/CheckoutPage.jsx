import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import PhoneOtpVerification from "../components/PhoneOtpVerification";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    addressType: "Home",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePlaceOrder = async () => {
    if (!isVerified) return alert("📲 Please verify your phone first");

    setIsPlacingOrder(true);
    await loadRazorpay();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "IndiyaSe",
      description: "Order Payment",
      handler: async function (response) {
        try {
          const payload = {
            ...form,
            userEmail: form.email,
            userName: form.name,
            userPhone: form.phone,
            address: form.address,
            products: cart,
            totalAmount: total,
            paymentId: response.razorpay_payment_id,
          };

          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, payload);
          alert("✅ Order placed successfully!");
          clearCart();
        } catch (err) {
          console.error(err);
          alert("❌ Failed to place order.");
        } finally {
          setIsPlacingOrder(false);
        }
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#0f172a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="space-y-3">
        {["name", "email", "phone", "address"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <select
          name="addressType"
          value={form.addressType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Home</option>
          <option>Work</option>
          <option>Other</option>
        </select>

        {/* OTP Verification */}
        <PhoneOtpVerification
          phone={form.phone.replace(/\s/g, "")}
          onVerify={setIsVerified}
        />

        <button
          onClick={handlePlaceOrder}
          disabled={!isVerified || isPlacingOrder}
          className={`w-full mt-4 py-2 rounded text-white ${
            isVerified ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order & Pay"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
