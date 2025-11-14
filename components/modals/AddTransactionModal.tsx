'use client';
import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { CreditCard, Tag, ChevronDown } from 'lucide-react';

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
        <h2 className="text-3xl font-bold text-[var(--secondary-text)] mb-6">Expenses</h2>

        <div className="bg-[var(--secondary-bg)] rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[var(--secondary-text)] text-2xl">€</span>
            <span className="text-4xl font-bold text-[var(--foreground)]">{amount}</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Add a comment ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-[var(--secondary-bg)] rounded-2xl px-6 py-4 mb-4 text-[var(--secondary-text)] placeholder-[var(--secondary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
        />

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[var(--page-bg)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background2)]">
            <CreditCard className="w-4 h-4" />
            <span>Wallet</span>
            <ChevronDown className="w-3 h-3 text-[var(--secondary-text)]" />
          </button>
          <button className="flex items-center gap-2 bg-[var(--page-bg)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background2)]">
            <Tag className="w-4 h-4" />
            <span>Category</span>
            <ChevronDown className="w-3 h-3 text-[var(--secondary-text)]" />
          </button>
        </div>
      </div>

      {/* Правая часть — Numpad */}
      <div className="w-[340px] bg-[var(--background-darker)] p-6 flex flex-col">
        <div className="grid grid-cols-4 gap-3 flex-1">
          {['1', '2', '3'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-[var(--background2)] hover:bg-[var(--page-bg)] rounded-2xl text-3xl font-bold text-[var(--foreground)] h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="bg-[var(--foreground)] hover:bg-[var(--border)] rounded-2xl text-[var(--background)] text-3xl font-bold h-20 flex items-center justify-center"
          >
            ⌫
          </button>

          {['4', '5', '6'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-[var(--background2)] hover:bg-[var(--page-bg)] rounded-2xl text-3xl font-bold text-[var(--foreground)] h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="bg-[var(--foreground)] hover:bg-[var(--border)] rounded-2xl text-[var(--background)] text-3xl font-bold h-20 flex items-center justify-center"
          >
            C
          </button>

          {['7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n)}
              className="bg-[var(--background2)] hover:bg-[var(--page-bg)] rounded-2xl text-3xl font-bold text-[var(--foreground)] h-20"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => closeModal('add')}
            className="bg-[var(--foreground)] hover:bg-[var(--border)] rounded-2xl text-[var(--background)] text-3xl font-bold h-20 flex items-center justify-center"
          >
            ✓
          </button>

          <button className="bg-[var(--foreground)] hover:bg-[var(--border)] rounded-2xl text-[var(--background)] text-3xl font-bold h-20 flex items-center justify-center">
            +
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="bg-[var(--background2)] hover:bg-[var(--page-bg)] rounded-2xl text-3xl font-bold text-[var(--foreground)] h-20"
          >
            0
          </button>
          <button
            onClick={() => handleNumberClick(',')}
            className="bg-[var(--background2)] hover:bg-[var(--page-bg)] rounded-2xl text-3xl font-bold text-[var(--foreground)] h-20"
          >
            ,
          </button>
        </div>
      </div>
    </div>
  );
}
