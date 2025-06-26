import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [updateAmount, setUpdateAmount] = useState({});

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wallet");
      setWallets(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch wallets", err);
    }
  };

  const handleWalletUpdate = async (email) => {
    try {
      const amount = Number(updateAmount[email]);
      const res = await axios.put(`http://localhost:5000/api/wallet/${email}/update`, {
        amount,
      });
      alert("✅ Wallet updated: ₹" + res.data.balance);
      setUpdateAmount((prev) => ({ ...prev, [email]: "" }));
      fetchWallets();
    } catch (err) {
      console.error("❌ Failed to update wallet", err);
      alert("❌ Wallet update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Wallets Overview</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>Current Balance</th>
            <th>Update Amount (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet, index) => (
            <tr key={wallet._id}>
              <td>{index + 1}</td>
              <td>{wallet.email}</td>
              <td>₹{wallet.balance}</td>
              <td>
                <input
                  type="number"
                  value={updateAmount[wallet.email] || ""}
                  onChange={(e) =>
                    setUpdateAmount({ ...updateAmount, [wallet.email]: e.target.value })
                  }
                  placeholder="₹ amount"
                />
              </td>
              <td>
                <button onClick={() => handleWalletUpdate(wallet.email)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWallet;
