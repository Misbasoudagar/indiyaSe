import React, {useState} from 'react';
import axios from 'axios';

export default function WalletTopUp({ userEmail }) {
  const [amt,setAmt] = useState('');
  const handle = () => {
    axios.put(`/api/wallet/${userEmail}/topup`, { amount: amt })
      .then(r => alert('New balance: ₹' + r.data.balance))
      .catch(console.error);
  };
  return (
    <div>
      <h2>Wallet Top-Up</h2>
      <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="₹ amount" />
      <button onClick={handle}>Add</button>
    </div>
  );
}
