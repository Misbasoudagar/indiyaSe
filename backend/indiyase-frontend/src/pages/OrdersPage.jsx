import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <div className="flex-grow p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">🧾 All Orders</h2>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total (₹)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 text-blue-600">{order._id}</td>
                      <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-semibold">₹{order.total}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm font-medium
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
