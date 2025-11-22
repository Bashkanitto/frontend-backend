'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/Card';
import {
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Tag,
  ShoppingBag,
  Gamepad2,
  Plane,
  Laptop,
  Heart,
} from 'lucide-react';

type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateFilter, setDateFilter] = useState<
    'all' | 'week' | 'month' | 'year'
  >('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Groceries',
      category: 'Supermarket',
      amount: -45.3,
      date: 'Today, 16:55',
      icon: ShoppingBag,
    },
    {
      id: '2',
      title: 'Entertainment',
      category: 'Steam',
      amount: -15.99,
      date: 'Nov 12, 11:50',
      icon: Gamepad2,
    },
    {
      id: '3',
      title: 'Travel',
      category: 'Italy',
      amount: -298.42,
      date: 'Nov 10, 09:30',
      icon: Plane,
    },
    {
      id: '4',
      title: 'Laptop Repair',
      category: 'Electronics',
      amount: -750.0,
      date: 'Nov 8, 14:20',
      icon: Laptop,
    },
    {
      id: '5',
      title: 'Health Insurance',
      category: 'Health',
      amount: -600.0,
      date: 'Nov 5, 10:15',
      icon: Heart,
    },
    {
      id: '6',
      title: 'Salary',
      category: 'Work',
      amount: 2500.0,
      date: 'Nov 1, 08:00',
      icon: DollarSign,
    },
  ];

  const categories = [
    'all',
    'Supermarket',
    'Entertainment',
    'Travel',
    'Electronics',
    'Health',
    'Work',
  ];

  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(
      (transaction) =>
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (transaction) => transaction.category === selectedCategory
      );
    }

    const now = new Date();
    if (dateFilter !== 'all') {
      filtered = filtered.filter((transaction) => {
        // Для демо - просто фильтруем по количеству дней от текущей даты
        const daysAgo =
          parseInt(transaction.date.split(' ')[1]?.replace(',', '')) || 1;
        return (
          daysAgo <=
          (dateFilter === 'week' ? 7 : dateFilter === 'month' ? 30 : 365)
        );
      });
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      if (sortBy === 'date') {
        // Для демо - сортируем по "дням назад"
        aValue = parseInt(a.date.split(' ')[1]?.replace(',', '')) || 0;
        bValue = parseInt(b.date.split(' ')[1]?.replace(',', '')) || 0;
      } else {
        aValue = Math.abs(a.amount);
        bValue = Math.abs(b.amount);
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [
    transactions,
    searchQuery,
    selectedCategory,
    dateFilter,
    sortBy,
    sortOrder,
  ]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getAmountSign = (amount: number) => {
    return amount >= 0 ? '+' : '';
  };

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );
  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="mx-auto min-h-screen">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--accent-bg)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                Total Transactions
              </p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {transactions.length}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-[var(--foreground)]" />
          </div>
        </Card>

        <Card
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--accent-bg)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                Income
              </p>
              <p className="text-2xl font-bold text-green-600">
                +${totalIncome.toFixed(2)}
              </p>
            </div>
            <ArrowUpDown className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--accent-bg)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                Expenses
              </p>
              <p className="text-2xl font-bold text-red-600">
                -${totalExpenses.toFixed(2)}
              </p>
            </div>
            <ArrowUpDown className="w-8 h-8 text-red-600" />
          </div>
        </Card>

        <Card
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--accent-bg)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                Balance
              </p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                ${totalBalance.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-[var(--foreground)]" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card
        className="rounded-3xl p-6 mb-6"
        style={{ backgroundColor: 'var(--accent-bg)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--secondary-text)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none"
                style={{
                  backgroundColor: 'var(--secondary-bg)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-xl focus:outline-none"
              style={{
                backgroundColor: 'var(--secondary-bg)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
              Period
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full px-4 py-2 rounded-xl focus:outline-none"
              style={{
                backgroundColor: 'var(--secondary-bg)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              }}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => toggleSort('date')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              sortBy === 'date'
                ? 'bg-[var(--sidebar-active)]'
                : 'bg-[var(--secondary-bg)]'
            }`}
            style={{ color: 'var(--foreground)' }}
          >
            <Calendar className="w-4 h-4" />
            <span>Date</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>

          <button
            onClick={() => toggleSort('amount')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              sortBy === 'amount'
                ? 'bg-[var(--sidebar-active)]'
                : 'bg-[var(--secondary-bg)]'
            }`}
            style={{ color: 'var(--foreground)' }}
          >
            <DollarSign className="w-4 h-4" />
            <span>Amount</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </Card>

      {/* Transactions List */}
      <Card
        className="rounded-3xl p-6"
        style={{ backgroundColor: 'var(--accent-bg)' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
          All Transactions ({filteredTransactions.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTransactions.map((transaction) => {
            const IconComponent = transaction.icon;
            return (
              <Card
                key={transaction.id}
                className="rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                style={{
                  backgroundColor: 'var(--background-darker)',
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent-bg)' }}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      style={{ color: 'var(--foreground)' }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{transaction.title}</div>
                    <div
                      className="text-sm"
                      style={{ color: 'var(--secondary-text)' }}
                    >
                      {transaction.category}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-bold ${getAmountColor(transaction.amount)}`}
                  >
                    {getAmountSign(transaction.amount)}$
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
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[var(--secondary-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[var(--secondary-text)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
              No transactions found
            </h3>
            <p className="text-sm text-[var(--secondary-text)]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
