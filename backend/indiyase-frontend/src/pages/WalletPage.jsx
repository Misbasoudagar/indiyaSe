import React, { useEffect, useState } from "react";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wallet/my");
        const data = await res.json();
        setWallet(data);
      } catch (err) {
        console.error("Failed to load wallet", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) return <p className="p-4">Loading wallet...</p>;
  if (!wallet) return <p className="p-4 text-red-600">No wallet data found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">💰 My Wallet</h2>
      <div className="text-xl font-semibold mb-6">
        Balance: ₹{wallet.balance}
      </div>

      <h3 className="text-lg font-bold mb-2">Transaction History</h3>
      <ul className="space-y-2">
        {wallet.transactions?.map((txn, i) => (
          <li key={i} className="border p-3 rounded flex justify-between">
            <div>
              <div className="font-semibold">{txn.description}</div>
              <div className="text-sm text-gray-600">
                {new Date(txn.date).toLocaleString()}
              </div>
            </div>
            <div className="font-bold text-green-600">+₹{txn.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletPage;
