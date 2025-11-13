'use client';
import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';

export default function AddTransactionModal() {
  const [amount, setAmount] = useState('25,00');
  const [comment, setComment] = useState('');

  const { closeModal } = useModalStore();

  const handleBackspace = () => setAmount(amount.slice(0, -1) || '0');
  const handleClear = () => setAmount('0');

  const handleNumberClick = (num: string) => {
    if (amount === '0') setAmount(num);
    else setAmount(amount + num);
  };
  return (
    <div className="flex">
      {/* Левая часть — форма */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-400 mb-6">Expenses</h2>

        <div className="bg-gray-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-2xl">€</span>
            <span className="text-4xl font-bold text-gray-900">{amount}</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Add a comment ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-gray-100 rounded-2xl px-6 py-4 mb-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-300">
            <span>💳</span>
            <span>Wallet</span>
            <span className="text-gray-500">▼</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-300">
            <span>🏷️</span>
            <span>Category</span>
            <span className="text-gray-500">▼</span>
          </button>
        </div>
      </div>

      {/* Правая часть — Numpad */}
      <div className="w-[340px] bg-gray-50 p-6 flex flex-col">
        <div className="grid grid-cols-4 gap-3 flex-1">
          {['1', '2', '3'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="bg-black hover:bg-gray-800 rounded-2xl text-white text-2xl font-bold h-20 flex items-center justify-center"
          >
            ⌫
          </button>

          {['4', '5', '6'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="bg-black hover:bg-gray-800 rounded-2xl text-white text-2xl font-bold h-20 flex items-center justify-center"
          >
            C
          </button>

          {['7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => closeModal('add')}
            className="bg-black hover:bg-gray-800 rounded-2xl row-span-2 h-[172px] flex items-center justify-center text-white text-4xl"
          >
            ✓
          </button>

          <button className="bg-black hover:bg-gray-800 rounded-2xl text-white text-3xl font-bold h-20 flex items-center justify-center">
            +
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
          >
            0
          </button>
          <button
            onClick={() => handleNumberClick(',')}
            className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
          >
            ,
          </button>
        </div>
      </div>
    </div>
  );
}
