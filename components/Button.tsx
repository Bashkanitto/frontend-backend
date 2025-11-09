'use client';

import Image from 'next/image';

export default function Button({ children }: { children?: React.ReactNode }) {
  // Условия для разных страниц
  const isSettings = 'settings';
  const bgColor = isSettings ? 'bg-red-500' : 'bg-[var(--foreground)]';
  const iconSrc = isSettings ? 'icons/logout_icon.svg' : 'icons/plus_icon.svg';
  const iconFilter = isSettings
    ? '[filter:var(--icon-filter)]'
    : '[filter:var(--icon-filter-back)]';

  return (
    <button
      className={`h-10 ${bgColor} rounded-xl flex items-center transition-all duration-200`}
    >
      <Image
        width={28}
        height={28}
        src={iconSrc}
        className={`${iconFilter} w-7 ml-4 mr-2`}
        alt="button icon"
      />
      <p
        className={`mr-4 font-semibold ${
          isSettings
            ? 'text-[var(--foreground)]' // ← текст чёрный на светлой, белый на тёмной
            : 'text-[var(--background)]'
        }`}
      >
        {children}
      </p>
    </button>
  );
}
