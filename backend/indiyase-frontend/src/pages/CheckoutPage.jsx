import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext'; // or your correct path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = ({ userEmail = '' }) => {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handlePlaceOrder = async () => {
    if (!cart || cart.length === 0) {
      alert('Cart is empty.');
      return;
    }

    if (!userEmail || !address) {
      alert('Please enter address and email.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/orders', {
        products: cart,
        userEmail,
        address,
      });
      alert('✔️ Order placed successfully!');
      navigate('/my-orders');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Checkout</h2>

      {cart.map((item, i) => (
        <p key={i}>
          {item.name} × {item.quantity || 1} = ₹{item.price}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: '300px', padding: '8px' }}
      />

      <br />

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
