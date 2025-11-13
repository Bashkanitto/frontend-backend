'use client';

import { usePageStore } from '@/store/usePageStore';
import { useModalStore } from '@/store/useModalStore';
import Button from './Button';

export default function Header() {
  const { currentPage } = usePageStore();
  const { openModal } = useModalStore();

  const pageTitles = {
    home: 'Budget Overview',
    categories: 'Categories',
    statistic: 'Statistic',
    wallet: 'Wallets',
    add: '',
  };

  // Выбор логики onClick в зависимости от страницы
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
        {pageTitles[currentPage]}
      </h1>
      <Button onClick={handleClick} />
    </header>
  );
}
