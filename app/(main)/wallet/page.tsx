import {
  Wallet,
  Banknote,
  Landmark,
  ShoppingBag,
  Gamepad2,
  Plane,
} from 'lucide-react';
import { getWallets } from '../../actions';
import { WalletEditCard } from '@/components/WalletEditCard';

interface WalletPageProps {
  searchParams: {
    open?: string;
  };
}

const iconMap = {
  wallet: Wallet,
  banknote: Banknote,
  landmark: Landmark,
};

export default async function WalletPage({ searchParams }: WalletPageProps) {
  const wallets = await getWallets();
  const currency = 'EUR';
  const openWalletId = searchParams.open;

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
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

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {wallets.map((wallet) => (
            <WalletEditCard
              key={wallet.id}
              wallet={wallet}
              icon={iconMap[wallet.icon as keyof typeof iconMap]}
              currencySymbol={
                currencySymbols[currency as keyof typeof currencySymbols]
              }
              isOpen={wallet.id.toString() === openWalletId}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6">Recent Transactions</h2>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
                    <transaction.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {transaction.title}
                    </div>
                    <div className="text-gray-400 text-sm">
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
                  <div className="text-gray-400 text-sm">
                    {transaction.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
