'use client';
import { useState } from 'react';
import { ArrowUp, ArrowDown, Landmark, ShoppingBasket } from 'lucide-react';

export default function MainWalletPage() {
  const [balance] = useState(2500);
  const [totalBalance] = useState(5000);
  const [incomes] = useState(3000);
  const [expenses] = useState(1500);
  const [savings] = useState(1000);

  const [currency] = useState<'EUR' | 'KZT' | 'USD'>('EUR');

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
      icon: ShoppingBasket,
    },
  ];

  const balancePercentage = (balance / totalBalance) * 100;

  return (
    <div className="bg-gray-50 w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Balance Card */}
        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">Main Wallet</h1>

          <div className="mt-6">
            <div className="text-5xl font-bold mb-2">
              {currencySymbols[currency]}
              {balance.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm mb-4">
              Remaining this month
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${balancePercentage}%` }}
              />
            </div>
            <div className="text-gray-400 text-sm mt-2">
              {currencySymbols[currency]}
              {totalBalance.toLocaleString()} Total Balance
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Incomes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <ArrowUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-sm">Incomes</div>
                <div className="text-3xl font-bold">
                  {currencySymbols[currency]}
                  {incomes.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <ArrowDown className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-sm">Expenses</div>
                <div className="text-3xl font-bold">
                  {currencySymbols[currency]}
                  {expenses.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-sm">Savings</div>
                <div className="text-3xl font-bold">
                  {currencySymbols[currency]}
                  {savings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Recent Transaction</h2>

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
                      {transaction.category}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg">
                    {currencySymbols[currency]}
                    {Math.abs(transaction.amount).toFixed(1)}
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
