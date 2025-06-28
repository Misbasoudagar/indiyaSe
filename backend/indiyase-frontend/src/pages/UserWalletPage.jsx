import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserWalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');

  const email = "demo@example.com"; // use actual logged-in user's email in real project

  const fetchWallet = async () => {
    const res = await axios.get("/api/wallet/my");
    setWallet(res.data);
  };

  const handleTopUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/wallet/${email}/update`, { amount: Number(amount) });
      alert("Wallet updated successfully!");
      setAmount('');
      fetchWallet(); // refresh data
    } catch (err) {
      console.error("Top-up failed", err);
      alert("Top-up failed");
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  if (!wallet) return <p>Loading wallet...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💼 My Wallet</h2>
      <p className="text-lg font-semibold mb-2">Balance: ₹{wallet.balance}</p>

      <h3 className="text-xl font-semibold mt-4">💸 Add Money</h3>
      <form onSubmit={handleTopUp} className="mb-6">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 mr-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add to Wallet
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-4">📜 Transaction History</h3>
      {wallet.transactions && wallet.transactions.length > 0 ? (
        wallet.transactions.map((tx, i) => (
          <div key={i} className="border p-2 my-2 rounded">
            <p className="font-semibold">{tx.description}</p>
            <p className="text-sm">{new Date(tx.date).toLocaleString()}</p>
            <p className="text-green-600 font-bold">+₹{tx.amount}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default UserWalletPage;
