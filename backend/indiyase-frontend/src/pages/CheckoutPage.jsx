import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("checkout_info", JSON.stringify(form));
    window.location.href = "/shipping";
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Left: Shipping Form */}
      <div>
        <h2 className="text-xl font-bold mb-4">Contact & Shipping</h2>
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          Continue to Shipping
        </button>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul className="divide-y">
          {cart.map((item, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
