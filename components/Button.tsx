'use client';

import { usePageStore } from '@/store/usePageStore';
import { Plus } from 'lucide-react';

type ButtonProps = {
  onClick?: () => void;
};

export default function Button({ onClick }: ButtonProps) {
  const { currentPage } = usePageStore();

  const buttonTitles = {
    home: 'Add transaction',
    categories: 'Add category',
    statistic: 'Add transaction',
    wallet: 'Add wallet',
    add: '',
  };

  return (
    <button
      onClick={onClick}
      className="h-10 bg-[var(--foreground)] rounded-xl flex items-center transition-all duration-200"
    >
      <Plus className="w-5 h-5 text-[var(--background)] ml-4 mr-2" />
      <p className="mr-4 font-semibold text-[var(--background)]">
        {buttonTitles[currentPage]}
      </p>
    </button>
  );
}
