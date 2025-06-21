import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WalletPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/wallet', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setBalance(res.data.balance))
      .catch(() => alert("Failed to load wallet"));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Wallet Balance</h2>
      <p className="text-green-600 text-lg">₹{balance}</p>
    </div>
  );
}

export default WalletPage;
