import React, { useEffect, useState } from "react";
import axios from "axios";

const WalletList = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/wallet");
        setWallets(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch wallets", err);
      }
    };

    fetchWallets();
  }, []);

  const handleWalletUpdate = async (email) => {
    const amount = prompt("Enter amount to add (+) or deduct (-):");
    if (!amount) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/wallet/${email}/update`, {
        amount: Number(amount),
      });
      alert("✅ Wallet updated: ₹" + res.data.balance);
      window.location.reload();
    } catch (err) {
      console.error("❌ Failed to update wallet", err);
      alert("❌ Wallet update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">👛 All Wallets</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">#</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">User Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Balance (₹)</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {wallets.map((w, idx) => (
              <tr key={w._id}>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{idx + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{w.email}</td>
                <td className="px-4 py-2 text-sm text-green-600 dark:text-green-400 font-semibold">₹{w.balance}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleWalletUpdate(w.email)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm text-sm transition"
                  >
                    Update Balance
                  </button>
                </td>
              </tr>
            ))}
            {wallets.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No wallets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletList;
