import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    addressType: 'Home',
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [useSaved, setUseSaved] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Fetch saved addresses when email is entered
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        if (!form.email) return;
        const res = await axios.get(`http://localhost:5000/api/users/addresses/${form.email}`);
        setSavedAddresses(res.data);
      } catch (err) {
        console.error("❌ Couldn't fetch saved addresses", err);
      }
    };
    fetchSaved();
  }, [form.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { name, email, phone, address, addressType } = form;
  
    // Basic validation
    if (!name || !email || !phone || !address) {
      alert('Please fill all required fields.');
      return;
    }
  
    const orderData = {
      products: cart,
      userName: name,
      userEmail: email,
      userPhone: phone,
      address: `${address} (${addressType})`,
      totalAmount: total,
      status: 'Pending'
    };
  
    try {
      // 1️⃣ Place the order
      await axios.post('http://localhost:5000/api/orders', orderData);
  
      // 2️⃣ Save the address if it's a new one
      if (!useSaved) {
        await axios.put(`http://localhost:5000/api/users/save-address/${email}`, {
          name,
          phone,
          address,
          addressType
        });
      }
  
      // 3️⃣ Final steps
      clearCart();
      alert('✅ Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error('❌ Order failed:', err);
      alert('Order failed. Please try again.');
    }
  };  

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all customer fields first.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: total
      });

      const options = {
        key: "rzp_test_xxxxxx", // Replace with real Razorpay Key
        amount: res.data.amount,
        currency: "INR",
        name: "IndiyaSe",
        description: "Order Payment",
        order_id: res.data.id,
        handler: function (response) {
          alert("✅ Payment successful: " + response.razorpay_payment_id);
          handlePlaceOrder();
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#1e40af"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/">Go back</a></p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Address & Form */}
          <div className="space-y-4">
            {/* Delivery Toggle */}
            <div>
              <label className="font-semibold">📍 Delivery Option:</label>
              <div className="flex gap-4 mt-2">
                <label>
                  <input type="radio" checked={useSaved} onChange={() => setUseSaved(true)} />
                  <span className="ml-1">Use Saved Address</span>
                </label>
                <label>
                  <input type="radio" checked={!useSaved} onChange={() => setUseSaved(false)} />
                  <span className="ml-1">Enter New Address</span>
                </label>
              </div>
            </div>

            {/* Saved Address Dropdown */}
            {useSaved && savedAddresses.length > 0 && (
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const selected = JSON.parse(e.target.value);
                  setForm({
                    ...form,
                    name: selected.name,
                    phone: selected.phone,
                    address: selected.address,
                    addressType: selected.addressType
                  });
                }}
              >
                <option>Select saved address</option>
                {savedAddresses.map((addr, i) => (
                  <option key={i} value={JSON.stringify(addr)}>
                    {addr.name} ({addr.addressType}) - {addr.address}
                  </option>
                ))}
              </select>
            )}

            {/* Customer Form */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            ></textarea>
            <select
              name="addressType"
              value={form.addressType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* RIGHT: Cart Summary */}
          <div className="bg-gray-100 p-4 border rounded">
            <h4 className="text-lg font-semibold mb-2">🛒 Cart Summary</h4>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between py-2">
                <span>{item.name} × {item.quantity || 1}</span>
                <span>₹{item.price * (item.quantity || 1)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="text-right text-lg font-bold">
              Total: ₹{total}
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              💳 Pay & Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
