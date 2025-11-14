import { Home, ShoppingBag, Laptop, Gamepad2, Plus, Heart } from 'lucide-react';
import { Card } from '@/components/Card';

export default function StatisticsPage() {
  const currency: 'EUR' | 'KZT' | 'USD' = 'EUR';

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
  };

  const topTransactions = [
    { id: 1, title: 'Groceries', category: 'Supermarket', amount: -45.3, date: '5 Nov', icon: Home },
    { id: 2, title: 'Laptop Repair', category: 'Electronics', amount: -750, date: '3 Nov', icon: Laptop },
    { id: 3, title: 'Health Insurance', category: 'Health', amount: -600, date: '1 Nov', icon: Heart },
    { id: 4, title: 'Groceries', category: 'Supermarket', amount: -45.3, date: 'Today, 16:55', icon: ShoppingBag },
    { id: 5, title: 'Entertainment', category: 'Stexlix', amount: -750, date: 'Nov 12, 11:50', icon: Gamepad2 },
    { id: 6, title: 'Gaming', category: 'Steam', amount: -750, date: 'Oct 28, 12:30', icon: Gamepad2 },
  ];

  const incomeCategories = [
    { name: 'Salary', percentage: 10, color: 'var(--foreground)' },
    { name: 'Investments', percentage: 20, color: 'var(--secondary-text)' },
    { name: 'Housing', percentage: 20, color: 'var(--secondary-bg)' },
    { name: 'Transport', percentage: 10, color: 'var(--background-darker)' },
  ];

  return (
    <div className="mx-auto min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        {/* Balance Chart */}
        <Card className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}>
          <h2 className="text-xl font-bold mb-2">Monthly Balance</h2>
          <div className="text-4xl font-bold mb-1">
            {currencySymbols[currency]}3,000
          </div>
          <div className="text-sm mb-8" style={{ color: 'var(--secondary-text)' }}>
            +500 compared to last month
          </div>

          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="var(--foreground)"
                strokeWidth="2"
                points="0,120 50,100 100,110 150,80 200,90 250,60 300,70 350,40 400,30"
              />
              {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => (
                <circle key={i} cx={x} cy={120 - i * 10} r="4" fill="var(--foreground)" />
              ))}
            </svg>
            <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--secondary-text)' }}>
              <span>{currencySymbols[currency]}5,000</span>
              <span>2</span>
              <span>80</span>
              <span>6</span>
              <span>8</span>
              <span>15</span>
              <span>12-30</span>
            </div>
          </div>
        </Card>

        {/* Income by Category */}
        <Card className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}>
          <h2 className="text-xl font-bold mb-8">Income by Category</h2>

          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--secondary-bg)" strokeWidth="20" />
                {incomeCategories.map((cat, i) => (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={cat.color}
                    strokeWidth="20"
                    strokeDasharray={`${cat.percentage * 2.512} 251.2`}
                    strokeDashoffset={-incomeCategories.slice(0, i).reduce((sum, c) => sum + c.percentage * 2.512, 0)}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">+80%</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {incomeCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                    {category.name} ({category.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Transactions */}
      <Card className="rounded-3xl p-8 shadow-lg mt-6" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}>
        <h2 className="text-xl font-bold mb-6">Top Transactions This Month</h2>

        <div className="grid grid-cols-2 gap-4">
          {topTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'var(--background-darker)', color: 'var(--foreground)' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-bg)' }}>
                  <transaction.icon className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                </div>
                <div>
                  <div className="font-semibold">{transaction.title}</div>
                  <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>{transaction.category}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {currencySymbols[currency]}
                  {Math.abs(transaction.amount).toFixed(1)}
                </div>
                <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>{transaction.date}</div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
