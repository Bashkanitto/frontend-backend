'use client';

import { useMemo } from 'react';
import { ArrowUp, ArrowDown, Landmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useModalStore } from '@/store/useModalStore';
import { getUserWallets, getUserCategories } from '@/lib/userData';
import { formatCurrency } from '@/lib/currencyUtils';
import { translations } from '@/lib/translations';

export default function MainWalletPage() {
  const { user } = useAuthStore();
  const { getUserTransactions } = useTransactionStore();
  const { currency, language } = useSettingsStore();
  const { openModal } = useModalStore();
  const t = translations[language];

  const transactions = user ? getUserTransactions(user.id) : [];
  const wallets = user ? getUserWallets(user.id) : [];
  const categories = user ? getUserCategories(user.id) : [];

  const { totalBalance, incomes, expenses, savings } = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthTransactions = transactions.filter(
      (tx) => new Date(tx.date) >= startOfMonth
    );

    const totalIncome = monthTransactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = monthTransactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const walletsTotal = wallets.reduce((sum, w) => sum + w.amount, 0);

    return {
      totalBalance: walletsTotal,
      incomes: totalIncome,
      expenses: totalExpense,
      savings: totalIncome - totalExpense,
    };
  }, [transactions, wallets]);

  const balance = totalBalance;
  const balancePercentage =
    totalBalance > 0 ? (balance / totalBalance) * 100 : 0;

  const recentTransactions = useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Income';
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="mx-auto">
      {/* Main Balance Card */}
      <Card className="p-8 mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.wallet}</h1>

        <div className="mt-6">
          <div className="text-5xl font-bold mb-2">
            {formatCurrency(balance, currency)}
          </div>

          <div className="text-sm mb-4 text-muted-foreground">
            Remaining this month
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 rounded-full overflow-hidden bg-secondary">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 bg-primary"
              style={{
                width: `${balancePercentage}%`,
              }}
            />
          </div>

          <div className="text-sm mt-2 text-muted-foreground">
            {formatCurrency(totalBalance, currency)} Total Balance
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Incomes */}
        <Card className="rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary">
              <ArrowUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t.incomes}</div>
              <div className="text-3xl font-bold">
                {formatCurrency(incomes, currency)}
              </div>
            </div>
          </div>
        </Card>

        {/* Expenses */}
        <Card className="rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary">
              <ArrowDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t.expenses}</div>
              <div className="text-3xl font-bold">
                {formatCurrency(expenses, currency)}
              </div>
            </div>
          </div>
        </Card>

        {/* Savings */}
        <Card className="rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Savings</div>
              <div className="text-3xl font-bold">
                {formatCurrency(savings, currency)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openModal('editTransaction', transaction)}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-secondary">
                  <span className="text-2xl">
                    {transaction.type === 'income' ? '💰' : '💸'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg">
                    {transaction.comment || 'Transaction'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getCategoryName(transaction.categoryId)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold text-lg ${
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount, currency)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}

          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
