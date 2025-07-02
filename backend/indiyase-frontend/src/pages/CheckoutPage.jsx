import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneOtpVerification from '../components/PhoneOtpVerification';


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
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

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
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'phone' ? value.replace(/\s/g, '') : value,
    });
  };

  const handlePlaceOrder = async () => {
    const { name, email, phone, address, addressType } = form;

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
      status: 'Pending',
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);

      if (!useSaved) {
        await axios.put(`http://localhost:5000/api/users/save-address/${email}`, {
          name,
          phone,
          address,
          addressType,
        });
      }

      clearCart();
      alert('✅ Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error('❌ Order failed:', err);
      alert('Order failed. Please try again.');
    }
  };

  const handlePayment = async () => {
    const { name, email, phone, address } = form;

    if (!name || !email || !phone || !address) {
      alert('Please fill all customer fields first.');
      return;
    }

    if (!isPhoneVerified) {
      alert('📵 Please verify your phone number before placing order.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: total,
      });

      const options = {
        key: 'rzp_test_xxxxxx', // Replace with your Razorpay key
        amount: res.data.amount,
        currency: 'INR',
        name: 'IndiyaSe',
        description: 'Order Payment',
        order_id: res.data.id,
        handler: function (response) {
          alert('✅ Payment successful: ' + response.razorpay_payment_id);
          handlePlaceOrder();
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#1e40af',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Razorpay failed:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/">Go back</a></p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Delivery Option */}
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
                    addressType: selected.addressType,
                  });
                  setIsPhoneVerified(false);
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
            {/* 🔐 OTP Verification Box */}
            {form.phone.length === 10 && !isPhoneVerified && (
  <PhoneOtpVerification>
    phone={form.phone.replace(/\s/g, '')}
    onVerify={setIsPhoneVerified}
    </PhoneOtpVerification>
)}

            {/* Phone Number Input with Verified Badge */}
<div className="relative">
  <input
    type="tel"
    name="phone"
    placeholder="Phone Number"
    value={form.phone}
    onChange={handleChange}
    className="w-full p-2 border rounded pr-10"
  />
  {isPhoneVerified && (
    <span className="absolute right-3 top-2 text-green-600 font-semibold text-sm">
      ✅ Verified
    </span>
  )}
</div>


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
