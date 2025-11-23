'use client';

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Card } from '@/components/Card';
import {
  Search,
  Calendar,
  DollarSign,
  ShoppingBag,
  Gamepad2,
  Plane,
  Laptop,
  Heart,
  CalendarDays,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

type TransactionCategory =
  | 'Supermarket'
  | 'Entertainment'
  | 'Travel'
  | 'Electronics'
  | 'Health'
  | 'Work';

type Transaction = {
  id: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';
type DateFilterType = 'all' | 'week' | 'month' | 'year' | 'custom';

const DateInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (inputRef.current && cursorRef.current !== null) {
      inputRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
      cursorRef.current = null;
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const rawValue = input.value;
    const selectionStart = input.selectionStart || 0;

    let digitsBeforeCursor = 0;
    for (let i = 0; i < selectionStart; i++) {
      if (/\d/.test(rawValue[i])) {
        digitsBeforeCursor++;
      }
    }

    const digits = rawValue.replace(/\D/g, '');

    if (digits.length > 8) return;

    let formattedValue = '';
    if (digits.length > 0) {
      formattedValue += digits.substring(0, 2);
      if (digits.length >= 3) {
        formattedValue += '-' + digits.substring(2, 4);
      }
      if (digits.length >= 5) {
        formattedValue += '-' + digits.substring(4, 8);
      }
    }

    let newCursorPos = 0;
    let digitsSeen = 0;

    for (let i = 0; i < formattedValue.length; i++) {
      if (digitsSeen === digitsBeforeCursor) break;
      if (/\d/.test(formattedValue[i])) digitsSeen++;
      newCursorPos++;
    }

    if (
      newCursorPos < formattedValue.length &&
      formattedValue[newCursorPos] === '-' &&
      rawValue.length > value.length
    ) {
      newCursorPos++;
    }

    cursorRef.current = newCursorPos;
    onChange(formattedValue);
  };

  return (
    <div>
      <label className="block mb-1.5 text-xs font-bold text-[var(--secondary-text)] uppercase tracking-wide">
        {label}
      </label>
      <div className="relative group">
        <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--secondary-text)] group-focus-within:text-[var(--primary)] transition-colors pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          placeholder="DD-MM-YYYY"
          value={value}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-mono"
          style={{
            backgroundColor: 'var(--secondary-bg)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          }}
        />
      </div>
    </div>
  );
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'Invalid Date';
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

const parseDMY = (dateStr: string): Date | null => {
  if (dateStr.length !== 10) return null;
  const [day, month, year] = dateStr.split('-').map(Number);
  if (!day || !month || !year) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (year < 1000) return null;
  return new Date(year, month - 1, day);
};

const today = new Date();
const getPastDate = (days: number) => {
  const d = new Date();
  d.setDate(today.getDate() - days);
  return d.toISOString();
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Groceries',
    category: 'Supermarket',
    amount: -45.3,
    date: getPastDate(0),
    icon: ShoppingBag,
  },
  {
    id: '2',
    title: 'Steam Game',
    category: 'Entertainment',
    amount: -15.99,
    date: getPastDate(1),
    icon: Gamepad2,
  },
  {
    id: '3',
    title: 'Trip to Italy',
    category: 'Travel',
    amount: -298.42,
    date: getPastDate(3),
    icon: Plane,
  },
  {
    id: '4',
    title: 'MacBook Repair',
    category: 'Electronics',
    amount: -750.0,
    date: getPastDate(10),
    icon: Laptop,
  },
  {
    id: '5',
    title: 'Insurance',
    category: 'Health',
    amount: -600.0,
    date: getPastDate(25),
    icon: Heart,
  },
  {
    id: '6',
    title: 'November Salary',
    category: 'Work',
    amount: 2500.0,
    date: getPastDate(32),
    icon: DollarSign,
  },
];

const CATEGORIES: (TransactionCategory | 'all')[] = [
  'all',
  'Supermarket',
  'Entertainment',
  'Travel',
  'Electronics',
  'Health',
  'Work',
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');

  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    const now = new Date();

    return MOCK_TRANSACTIONS.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || t.category === selectedCategory;

      let matchesDate = true;
      const tDate = new Date(t.date);

      if (dateFilter === 'custom') {
        const start = parseDMY(customStartDate);
        const end = parseDMY(customEndDate);

        if (start) {
          start.setHours(0, 0, 0, 0);
          if (tDate < start) matchesDate = false;
        }

        if (end && matchesDate) {
          end.setHours(23, 59, 59, 999);
          if (tDate > end) matchesDate = false;
        }
      } else if (dateFilter !== 'all') {
        const diffTime = Math.abs(now.getTime() - tDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (dateFilter === 'week') matchesDate = diffDays <= 7;
        else if (dateFilter === 'month') matchesDate = diffDays <= 30;
        else if (dateFilter === 'year') matchesDate = diffDays <= 365;
      }

      return matchesSearch && matchesCategory && matchesDate;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.amount - b.amount;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [
    searchQuery,
    selectedCategory,
    dateFilter,
    sortBy,
    sortOrder,
    customStartDate,
    customEndDate,
  ]);

  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income + expense };
  }, [filteredTransactions]);

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) return null;

    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-1.5 animate-in fade-in zoom-in duration-200" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1.5 animate-in fade-in zoom-in duration-200" />
    );
  };

  const inputStyles = {
    backgroundColor: 'var(--secondary-bg)',
    color: 'var(--foreground)',
    border: '1px solid var(--border)',
  };

  const activeBtnClass =
    'bg-[var(--sidebar-active)] text-[var(--foreground)] cursor-pointer shadow-sm ring-1 ring-black/5';
  const inactiveBtnClass =
    'bg-[var(--secondary-bg)] text-[var(--secondary-text)] hover:text-[var(--foreground)] hover:bg-[var(--border)] cursor-pointer';

  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4">
      <Card className="rounded-3xl p-6 mb-6 shadow-lg bg-[var(--accent-bg)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label className="block mb-1.5 text-xs font-bold text-[var(--secondary-text)] uppercase tracking-wide">
              Search
            </label>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--secondary-text)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                style={inputStyles}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block mb-1.5 text-xs font-bold text-[var(--secondary-text)] uppercase tracking-wide">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
              style={inputStyles}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block mb-1.5 text-xs font-bold text-[var(--secondary-text)] uppercase tracking-wide">
              Time Period
            </label>
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value as DateFilterType);
                if (e.target.value !== 'custom') {
                  setCustomStartDate('');
                  setCustomEndDate('');
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
              style={inputStyles}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range...</option>
            </select>
          </div>

          <div className="md:col-span-2 flex gap-2">
            <button
              onClick={() => toggleSort('date')}
              className={`flex-1 flex justify-center items-center p-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                sortBy === 'date' ? activeBtnClass : inactiveBtnClass
              }`}
              title={
                sortBy === 'date'
                  ? `Sort by Date (${sortOrder})`
                  : 'Sort by Date'
              }
            >
              <Calendar className="w-4 h-4" />

              {getSortIcon('date')}
            </button>

            <button
              onClick={() => toggleSort('amount')}
              className={`flex-1 flex justify-center items-center p-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                sortBy === 'amount' ? activeBtnClass : inactiveBtnClass
              }`}
              title={
                sortBy === 'amount'
                  ? `Sort by Amount (${sortOrder})`
                  : 'Sort by Amount'
              }
            >
              <DollarSign className="w-4 h-4" />

              {getSortIcon('amount')}
            </button>
          </div>
        </div>

        {dateFilter === 'custom' && (
          <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <DateInput
              label="From Date"
              value={customStartDate}
              onChange={setCustomStartDate}
            />
            <DateInput
              label="To Date"
              value={customEndDate}
              onChange={setCustomEndDate}
            />
          </div>
        )}
      </Card>

      <Card
        className="rounded-3xl p-8 shadow-lg mt-6"
        style={{
          backgroundColor: 'var(--accent-bg)',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">All Transactions</h2>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-[var(--background-darker)] text-[var(--secondary-text)]">
            {filteredTransactions.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTransactions.map((transaction) => {
            const IconComponent = transaction.icon;
            const isPositive = transaction.amount >= 0;

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
                      className="text-sm mt-0.5"
                      style={{ color: 'var(--secondary-text)' }}
                    >
                      {transaction.category}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-bold text-lg ${isPositive ? 'text-green-500' : ''}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--background-darker)' }}
            >
              <Search className="w-8 h-8 text-[var(--secondary-text)]" />
            </div>
            <h3 className="text-lg font-medium">No transactions found</h3>
            <p className="text-sm text-[var(--secondary-text)] mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
