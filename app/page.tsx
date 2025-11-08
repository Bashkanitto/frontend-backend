'use client';

import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { WalletCard } from './components/WalletCard';
import { useState, useEffect } from 'react';
import { usePageStore } from '@/store/usePageStore';
import SettingsPage from './(pages)/settings/page';
import { TransactionItem } from './components/TransactionItem';
import { ShoppingCart, Gamepad2, Cross, Wallet, DollarSign, Building2 } from 'lucide-react';
import MainWalletPage from './(pages)/home/page';
import StatisticsPage from './(pages)/statistic/page';

export default function Home() {
  const { currentPage } = usePageStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col background">
        <Header />
        <main className="p-6 overflow-y-auto">
          {/* Страница Wallet */}
          {currentPage === 'wallet' && (
            <>
              {/* Wallet cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <WalletCard name="Main Wallet" amount={3000} icon={Wallet} />
                <WalletCard name="Cash" amount={6000} icon={DollarSign} />
                <WalletCard name="Savings" amount={1000} icon={Building2} />
              </div>

              {/* Transactions */}
              <section className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Transaction</h3>
                <div className="flex flex-col gap-2">
                  <TransactionItem
                    icon={ShoppingCart}
                    title="Groceries"
                    subtitle="Supermarket"
                    amount="-€45,3"
                    date="Today, 16:55"
                  />
                  <TransactionItem
                    icon={Gamepad2}
                    title="Entertainment"
                    subtitle="Steam"
                    amount="-€5,2"
                    date="Nov 13, 23:00"
                  />
                  <TransactionItem
                    icon={Cross}
                    title="Health"
                    subtitle="Dentistry"
                    amount="-€100,15"
                    date="Oct 28, 9:02"
                  />
                </div>
              </section>
            </>
          )}

          {/* Страница Settings */}
          {currentPage === 'settings' && <SettingsPage />}

          {currentPage === 'home' && <MainWalletPage/>}
          {currentPage === 'statistic' && <StatisticsPage/>}
        </main>
      </div>

      <Modal />
    </div>
  );
}
