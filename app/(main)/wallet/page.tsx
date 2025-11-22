'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getUserWallets, Wallet } from '@/lib/userData';
import { WalletEditCard } from '@/components/WalletEditCard';
import { Card } from '@/components/Card';
import { ShoppingBag, Gamepad2, Plane } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function WalletPage() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const openWalletId = searchParams.get('open');

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const currency = 'EUR';

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
  };

  useEffect(() => {
    if (user?.id) {
      const userWallets = getUserWallets(user.id);
      setWallets(userWallets);
    }
  }, [user]);

  const handleUpdate = () => {
    if (user?.id) {
      const userWallets = getUserWallets(user.id);
      setWallets(userWallets);
    }
  };

  const recentTransactions = [
    {
      id: 1,
      title: 'Shopping',
      subtitle: 'Zara',
      amount: -127.99,
      date: 'Today, 21:07',
      icon: ShoppingBag,
    },
    {
      id: 2,
      title: 'Entertainment',
      subtitle: 'Steam',
      amount: -5.4,
      date: 'Yesterday, 23:59',
      icon: Gamepad2,
    },
    {
      id: 3,
      title: 'Travel',
      subtitle: 'Italy',
      amount: -298.42,
      date: 'Yesterday, 23:59',
      icon: Plane,
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {wallets.map((wallet) => (
            <WalletEditCard
              key={wallet.id}
              wallet={wallet}
              iconName={wallet.icon}
              currencySymbol={
                currencySymbols[currency as keyof typeof currencySymbols]
              }
              isOpen={wallet.id.toString() === openWalletId}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Recent Transactions */}
        <Card
          className="rounded-3xl p-8 shadow-lg"
          style={{
            backgroundColor: 'var(--accent-bg)',
            color: 'var(--foreground)',
          }}
        >
          <h2 className="text-3xl font-bold mb-6">Recent Transactions</h2>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: 'var(--background-darker)',
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent-bg)' }}
                  >
                    <transaction.icon
                      className="w-7 h-7"
                      style={{ color: 'var(--foreground)' }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {transaction.title}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: 'var(--secondary-text)' }}
                    >
                      {transaction.subtitle}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg">
                    {transaction.amount < 0 ? '-' : '+'}
                    {currencySymbols[currency as keyof typeof currencySymbols]}
                    {Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    {transaction.date}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
