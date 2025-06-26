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
    <div style={{ padding: "20px" }}>
      <h2>👛 All Wallets</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>Balance (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((w, idx) => (
            <tr key={w._id}>
              <td>{idx + 1}</td>
              <td>{w.email}</td>
              <td>₹{w.balance}</td>
              <td>
                <button onClick={() => handleWalletUpdate(w.email)}>Update Balance</button>
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default WalletList;
