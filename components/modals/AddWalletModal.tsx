'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

export default function AddWalletModal() {
  const { closeModal } = useModalStore();
  const [walletName, setWalletName] = useState('');
  const [currency, setCurrency] = useState('€');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ walletName, currency });
    closeModal('addWallet');
  };

  return (
    <div className="w-[420px] bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Wallet</h2>
        <button onClick={() => closeModal('addWallet')}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Wallet Name
          </label>
          <input
            type="text"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder="Main Wallet"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black"
          >
            <option value="€">Euro (€)</option>
            <option value="$">USD ($)</option>
            <option value="₸">KZT (₸)</option>
            <option value="₽">RUB (₽)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white rounded-xl py-2 font-medium hover:bg-gray-800 transition"
        >
          Add Wallet
        </button>
      </form>
    </div>
  );
}
