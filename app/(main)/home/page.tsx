import { ArrowUp, ArrowDown, Landmark, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/Card';

export default function MainWalletPage() {
  const balance = 2500;
  const totalBalance = 5000;
  const incomes = 3000;
  const expenses = 1500;
  const savings = 1000;

  const currency: 'EUR' | 'KZT' | 'USD' = 'EUR';

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
  };

  const recentTransactions = [
    {
      id: 1,
      title: 'Groceries',
      category: 'Supermarket',
      amount: -45.3,
      date: 'Nov 13, 16:55',
      icon: ShoppingCart,
    },
  ];

  const balancePercentage = (balance / totalBalance) * 100;

  return (
    <div className="mx-auto">
      {/* Main Balance Card */}
      <Card className="p-8 mb-6" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}>
        <h1 className="text-2xl font-bold mb-2">Main Wallet</h1>

        <div className="mt-6">
          <div className="text-5xl font-bold mb-2">
            {currencySymbols[currency]}
            {balance.toLocaleString()}
          </div>

          <div className="text-sm mb-4" style={{ color: 'var(--secondary-text)' }}>Remaining this month</div>

          {/* Progress Bar (static) */}
          <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
              style={{ width: `${balancePercentage}%`, backgroundColor: 'var(--foreground)' }}
            />
          </div>

          <div className="text-sm mt-2" style={{ color: 'var(--secondary-text)' }}>
            {currencySymbols[currency]}
            {totalBalance.toLocaleString()} Total Balance
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Incomes */}
        <Card className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: 'var(--accent-bg)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <ArrowUp className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
            </div>
            <div>
              <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>Incomes</div>
              <div className="text-[var(--foreground)] text-3xl font-bold">
                {currencySymbols[currency]}
                {incomes.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        {/* Expenses */}
        <Card className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: 'var(--accent-bg)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <ArrowDown className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
            </div>
            <div>
              <div className=" text-sm" style={{ color: 'var(--secondary-text)' }}>Expenses</div>
              <div className="text-[var(--foreground)] text-3xl font-bold">
                {currencySymbols[currency]}
                {expenses.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        {/* Savings */}
        <Card className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: 'var(--accent-bg)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <Landmark className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
            </div>
            <div>
              <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>Savings</div>
              <div className="text-[var(--foreground)] text-3xl font-bold">
                {currencySymbols[currency]}
                {savings.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-3xl" style={{ color: 'var(--foreground)' }}>
        <h2 className="text-2xl font-bold mb-6">Recent Transaction</h2>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="rounded-2xl p-5 flex items-center justify-between hover:transition-colors"
              style={{
                backgroundColor: 'var(--accent-bg)',
                color: 'var(--foreground)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-bg)' }}>
                  <transaction.icon className="w-7 h-7" style={{ color: 'var(--foreground)' }} />
                </div>
                <div>
                  <div className="font-semibold text-lg">{transaction.title}</div>
                  <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>{transaction.category}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg">
                  {currencySymbols[currency]}
                  {Math.abs(transaction.amount).toFixed(1)}
                </div>
                <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>{transaction.date}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
