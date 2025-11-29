'use client';

import { useModalStore } from '@/store/useModalStore';
import Button from './Button';
import { usePathname } from 'next/navigation';
import { Page, usePageStore } from '@/store/usePageStore';
import { useEffect } from 'react';

export default function Header() {
  const { setPage } = usePageStore();
  const { openModal } = useModalStore();

  const pathname = usePathname();

  const currentPage = pathname.replace('/', '');

  useEffect(() => {
    setPage(currentPage as Page);
  }, [pathname, setPage, currentPage]);

  const pageTitles: Record<string, string> = {
    home: 'Budget Overview',
    categories: 'Categories',
    statistic: 'Statistic',
    wallet: 'Wallets',
    transactions: 'Transactions',
  };

  const handleClick = () => {
    if (currentPage === 'wallet') {
      openModal('addWallet');
    } else if (currentPage === 'categories') {
      openModal('addCategory');
    } else {
      openModal('add');
    }
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-7 text-[var(--foreground)]">
      <h1 className="text-3xl font-black capitalize">
        {pageTitles[currentPage] ?? pageTitles.home}
      </h1>
      <Button onClick={handleClick} />
    </header>
  );
}
