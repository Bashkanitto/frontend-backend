'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

export default function AddCategoryModal() {
  const { closeModal } = useModalStore();
  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ categoryName, type });
    closeModal('addCategory');
  };

  return (
    <div
      className="w-[420px] rounded-3xl p-6 shadow-xl"
      style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Category</h2>
        <button onClick={() => closeModal('addCategory')}>
          <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-[var(--secondary-text)] block mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Groceries"
            className="w-full rounded-xl px-3 py-2 focus:outline-none"
            style={{
              backgroundColor: 'var(--secondary-bg)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            }}
          />
        </div>

        <div>
          <label className="text-sm text-[var(--secondary-text)] block mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="w-full rounded-xl px-3 py-2 focus:outline-none"
            style={{
              backgroundColor: 'var(--secondary-bg)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-xl py-2 font-medium transition"
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--accent-bg)',
          }}
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
