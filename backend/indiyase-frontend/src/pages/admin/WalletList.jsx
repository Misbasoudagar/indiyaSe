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

  return (
    <div style={{ padding: "20px" }}>
      <h2>👛 Wallet Balances</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet, idx) => (
            <tr key={wallet._id}>
              <td>{idx + 1}</td>
              <td>{wallet.userEmail}</td>
              <td>₹{wallet.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletList;
