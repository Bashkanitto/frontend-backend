import { Home, ShoppingBasket, Laptop, Gamepad, Plus } from 'lucide-react';
import { Card } from '@/components/Card';

export default function StatisticsPage() {
  const currency: 'EUR' | 'KZT' | 'USD' = 'EUR';

  const currencySymbols = {
    EUR: '€',
    KZT: '₸',
    USD: '$',
  };

  const topTransactions = [
    {
      id: 1,
      title: 'Groceries',
      category: 'Supermarket',
      amount: -45.3,
      date: '5 Nov',
      icon: Home,
    },
    {
      id: 2,
      title: 'Laptop Repair',
      category: 'Electronics',
      amount: -750,
      date: '3 Nov',
      icon: Laptop,
    },
    {
      id: 3,
      title: 'Health Insurance',
      category: 'Health',
      amount: -600,
      date: '1 Nov',
      icon: Plus,
    },
    {
      id: 4,
      title: 'Groceries',
      category: 'Supermarket',
      amount: -45.3,
      date: 'Today, 16:55',
      icon: ShoppingBasket,
    },
    {
      id: 5,
      title: 'Entertainment',
      category: 'Stexlix',
      amount: -750,
      date: 'Nov 12, 11:50',
      icon: Gamepad,
    },
    {
      id: 6,
      title: 'Gaming',
      category: 'Steam',
      amount: -750,
      date: 'Oct 28, 12:30',
      icon: Gamepad,
    },
  ];

  const incomeCategories = [
    { name: 'Salary', percentage: 10, color: 'bg-gray-700' },
    { name: 'Investments', percentage: 20, color: 'bg-gray-400' },
    { name: 'Housing', percentage: 20, color: 'bg-gray-300' },
    { name: 'Transport', percentage: 10, color: 'bg-gray-200' },
  ];

  return (
    <div className="mx-auto min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        
        {/* Balance Chart */}
        <Card className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Monthly Balance</h2>

          <div className="text-4xl font-bold mb-1">
            {currencySymbols[currency]}3,000
          </div>

          <div className="text-green-500 text-sm mb-8">
            +500 compared to last month
          </div>

          <div className="relative h-48">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 150"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#000"
                strokeWidth="2"
                points="0,120 50,100 100,110 150,80 200,90 250,60 300,70 350,40 400,30"
              />

              {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => (
                <circle key={i} cx={x} cy={120 - i * 10} r="4" fill="#000" />
              ))}
            </svg>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
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
        <Card className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-8">Income by Category</h2>

          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="20"
                  strokeDasharray="25.12 251.2"
                  strokeDashoffset="0"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="20"
                  strokeDasharray="50.24 251.2"
                  strokeDashoffset="-25.12"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="20"
                  strokeDasharray="50.24 251.2"
                  strokeDashoffset="-75.36"
                />
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
                  <div
                    className={`w-3 h-3 rounded-full ${category.color}`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {category.name} ({category.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Transactions */}
      <Card className="bg-white rounded-3xl p-8 shadow-sm mt-6">
        <h2 className="text-xl font-bold mb-6">Top Transactions This Month</h2>

        <div className="grid grid-cols-2 gap-4">
          {topTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <transaction.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{transaction.title}</div>
                  <div className="text-sm text-gray-400">
                    {transaction.category}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {currencySymbols[currency]}
                  {Math.abs(transaction.amount).toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">{transaction.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
