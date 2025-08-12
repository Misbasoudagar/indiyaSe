import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ email: "", status: "" });
  const [page, setPage] = useState(1);
  const visibleCount = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/admin")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to load orders", err));
  }, []);

  // Reset to first page on filter change
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      (!filter.email || o.user?.email?.toLowerCase().includes(filter.email.toLowerCase())) &&
      (!filter.status || o.status === filter.status)
  );

  const visibleOrders = filteredOrders.slice(0, page * visibleCount);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📦 Manage Orders</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by email"
          className="border p-2 rounded w-full sm:w-1/3"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
        />
        <select
          className="border p-2 rounded w-full sm:w-1/4"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase font-semibold">
              <th className="p-3">#</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ordered At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((o, idx) => (
              <tr key={o._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{(page - 1) * visibleCount + idx + 1}</td>
                <td className="p-3">{o.user?.email}</td>
                <td className="p-3">₹{o.total}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <Link
                    to={`/admin/orders/${o._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>
                  {o.status !== "Delivered" && (
                    <button
                      onClick={() => handleStatusUpdate(o._id, "Delivered")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {visibleOrders.length < filteredOrders.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded text-sm"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrderList;
