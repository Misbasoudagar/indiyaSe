import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({products:0, orders:0, users:0});
  useEffect(() => {
    Promise.all([
      axios.get('/api/products/count'),
      axios.get('/api/orders/count'),
      axios.get('/api/users/count')
    ]).then(([p,o,u]) => {
      setStats({products: p.data.count, orders: o.data.count, users: u.data.count});
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h2>📊 Analytics</h2>
      <p>Products: {stats.products}</p>
      <p>Orders: {stats.orders}</p>
      <p>Users: {stats.users}</p>
    </div>
  );
}
