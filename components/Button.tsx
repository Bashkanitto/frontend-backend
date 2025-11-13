'use client';

import { usePageStore } from '@/store/usePageStore';
import Image from 'next/image';

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

  const iconFilter = '[filter:var(--icon-filter-back)]';

  return (
    <button
      onClick={onClick}
      className="h-10 bg-[var(--foreground)] rounded-xl flex items-center transition-all duration-200"
    >
      <Image
        src="/icons/plus_icon.svg"
        className={`${iconFilter} w-7 ml-4 mr-2`}
        alt="button icon"
        width={56}
        height={56}
      />
      <p className="mr-4 font-semibold text-[var(--background)]">
        {buttonTitles[currentPage]}
      </p>
    </button>
  );
}
