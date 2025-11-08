'use client';

import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { WalletCard } from './components/WalletCard';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    // Очистка таймера при размонтировании
    return () => clearTimeout(timer);
  }, []);

  // ✅ Если идёт загрузка — показываем лоадер
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // ✅ Когда загрузка закончилась — показываем основное содержимое
  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col background">
        <Header />
        <main className="p-4 mx-7 rounded-xl bg-[var(--background)] h-[50%]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      </div>
        </main>
      </div>

      <Modal />
    </div>
  );
}
