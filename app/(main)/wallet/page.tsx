import { Wallet, Banknote, Landmark, ShoppingBag, Gamepad2, Plane, Edit } from 'lucide-react';

export default function MainWalletPage() {
  const currency = 'EUR';

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
  };

  const wallets = [
    { id: 1, name: 'Wallet', amount: 3000, icon: Wallet },
    { id: 2, name: 'Cash', amount: 6000, icon: Banknote },
    { id: 3, name: 'Savings', amount: 1000, icon: Landmark },
  ];

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
        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <wallet.icon className="w-6 h-6" />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="text-gray-600 text-sm mb-1">{wallet.name}</div>
              <div className="text-3xl font-bold">
                {currencySymbols[currency as keyof typeof currencySymbols]}
                {wallet.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
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