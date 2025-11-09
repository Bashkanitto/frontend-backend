'use client';

import { usePageStore } from '@/store/usePageStore';
import Button from './Button';

export default function Header() {
  const { currentPage } = usePageStore();

  const pageTitles = {
    home: 'Budget Overview',
    settings: 'Settings',
    statistic: 'Statistic',
    wallet: 'Wallets',
    add: '',
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-7 text-[var(--foreground)]">
      <h1 className="text-3xl font-black capitalize">
        {pageTitles[currentPage]}
      </h1>
      <Button />
    </header>
  );
}
