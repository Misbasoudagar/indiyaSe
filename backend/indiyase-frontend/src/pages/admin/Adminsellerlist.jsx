import React, { useEffect, useState } from "react";

const AdminSellerList = () => {
  const [sellers, setSellers] = useState([]);

  // Fetch all sellers
  const fetchSellers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sellers/all");
      const data = await res.json();
      setSellers(data);
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
    }
  };

  // Update seller status
  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/sellers/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchSellers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Delete seller
  const deleteSeller = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sellers/${id}`, {
        method: "DELETE",
      });
      fetchSellers();
    } catch (error) {
      console.error("Failed to delete seller:", error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 items-center justify-center px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🛍️ Seller Requests
        </h2>
        <div className="overflow-auto">
          <table className="w-full border rounded text-sm shadow-md">
            <thead className="bg-indigo-200 text-indigo-800 font-semibold">
              <tr>
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">Email</th>
                <th className="px-4 py-2 border text-left">Phone</th>
                <th className="px-4 py-2 border text-left">GST/UIN</th>
                <th className="px-4 py-2 border text-left">Category</th>
                <th className="px-4 py-2 border text-center">Status</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{seller.name}</td>
                  <td className="px-4 py-2 border">{seller.email}</td>
                  <td className="px-4 py-2 border">{seller.phone}</td>
                  <td className="px-4 py-2 border">{seller.gstOrUin}</td>
                  <td className="px-4 py-2 border">{seller.category}</td>
                  <td className="px-4 py-2 border text-center capitalize">
                    {seller.status}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {seller.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(seller._id, "approved")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(seller._id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => deleteSeller(seller._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {seller.status === "approved" && (
                      <span className="text-green-600 font-semibold">
                        ✔ Approved
                      </span>
                    )}
                    {seller.status === "rejected" && (
                      <span className="text-red-600 font-semibold">
                        ✖ Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {sellers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No seller requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSellerList;
