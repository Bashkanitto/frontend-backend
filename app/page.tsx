'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '../components/Modal';
import { WalletCard } from '../components/WalletCard';
import { TransactionItem } from '../components/TransactionItem';
import {
  ShoppingCart,
  Gamepad2,
  Cross,
  Wallet,
  DollarSign,
  Building2,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex flex-col background">
        <main className="p-6 overflow-y-auto">
          {/* Страница Wallet */}
          <>
            {/* Wallet cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <WalletCard name="Main Wallet" amount={3000} icon={Wallet} />
              <WalletCard name="Cash" amount={6000} icon={DollarSign} />
              <WalletCard name="Savings" amount={1000} icon={Building2} />
            </div>

            {/* Transactions */}
            <section className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Recent Transaction
              </h3>
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
        </main>
      </div>

      <Modal />
    </div>
  );
}
