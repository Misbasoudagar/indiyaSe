import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';

export default function AdminOrderDetails() {
  const {id} = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${id}`)
      .then(r => setOrder(r.data))
      .catch(console.error);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order #{order._id}</h2>
      <Link to="/admin/orders">← Back to Orders</Link>
      <h3>Products</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.product._id}>
            {item.product.name} × {item.qty} = ₹{item.product.price * item.qty}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
    </div>
  );
}
