import React, {useState, useEffect} from 'react';
export default function OrderTracking({ orderId }) {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    axios.get(`/api/orders/${orderId}`).then(r=>setOrder(r.data)).catch(console.error);
  }, [orderId]);
  if(!order) return <p>Loading...</p>;
  return (
    <div>
      <h2>Order Status: {order.status}</h2>
      <ul>{order.items.map(i => (
        <li key={i.product._id}>{i.product.name} × {i.qty}</li>
      ))}</ul>
    </div>
  );
}
