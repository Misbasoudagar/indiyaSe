import React, { useEffect, useState } from "react";

const AdminSellerList = () => {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    const res = await fetch("http://localhost:5000/api/sellers/all");
    const data = await res.json();
    setSellers(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/sellers/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchSellers(); // refresh
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Requests</h2>
      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">GST/UIN</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <td className="border px-3 py-1">{seller.name}</td>
                <td className="border px-3 py-1">{seller.email}</td>
                <td className="border px-3 py-1">{seller.phone}</td>
                <td className="border px-3 py-1">{seller.gstOrUin}</td>
                <td className="border px-3 py-1">{seller.category}</td>
                <td className="border px-3 py-1 text-center capitalize">{seller.status}</td>
                <td className="border px-3 py-1 text-center">
                  <button
                    onClick={() => updateStatus(seller._id, "approved")}
                    className="text-green-600 hover:underline mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(seller._id, "rejected")}
                    className="text-red-600 hover:underline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {sellers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No seller requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSellerList;
