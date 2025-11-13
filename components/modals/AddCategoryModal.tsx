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
    <div className="w-[420px] bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Category</h2>
        <button onClick={() => closeModal('addCategory')}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Groceries"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white rounded-xl py-2 font-medium hover:bg-gray-800 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
