'use client';

import { usePathname } from 'next/navigation';
import Button from './Button';

export default function Header() {
  const pathname = usePathname().replace('/', '');

  return (
    <header className="w-full h-20 flex items-center justify-between px-7 text-[var(--foreground)]">
      <h1 className="text-3xl font-black capitalize">{pathname}</h1>
      <Button />
    </header>
  );
}
