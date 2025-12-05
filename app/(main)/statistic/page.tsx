// app/(main)/statistic/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { getUserCategories } from '@/lib/userData';
import { formatCurrency } from '@/lib/currencyUtils';
import { translations } from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

type TimePeriod = 'week' | 'month' | 'year' | 'all';

export default function StatisticsPage() {
  const { user } = useAuthStore();
  const { getUserTransactions } = useTransactionStore();
  const { currency, language } = useSettingsStore();
  const t = translations[language];

  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  const transactions = user ? getUserTransactions(user.id) : [];
  const categories = user ? getUserCategories(user.id) : [];

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    switch (timePeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        return transactions;
    }

    return transactions.filter((tx) => new Date(tx.date) >= startDate);
  }, [transactions, timePeriod]);

  const { totalIncome, totalExpense } = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, tx) => {
        if (tx.type === 'income') {
          acc.totalIncome += tx.amount;
        } else {
          acc.totalExpense += tx.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [filteredTransactions]);

  const balance = totalIncome - totalExpense;

  const categoryData = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};

    filteredTransactions
      .filter((tx) => tx.type === 'expense' && tx.categoryId)
      .forEach((tx) => {
        if (tx.categoryId) {
          expensesByCategory[tx.categoryId] =
            (expensesByCategory[tx.categoryId] || 0) + tx.amount;
        }
      });

    const total = Object.values(expensesByCategory).reduce(
      (sum, val) => sum + val,
      0
    );

    return categories
      .map((cat) => ({
        name: cat.name,
        value: expensesByCategory[cat.id] || 0,
        percentage:
          total > 0 ? ((expensesByCategory[cat.id] || 0) / total) * 100 : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [filteredTransactions, categories]);

  const lineChartData = useMemo(() => {
    const dataMap: Record<string, { income: number; expense: number }> = {};

    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      const key =
        timePeriod === 'week' || timePeriod === 'month'
          ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            });

      if (!dataMap[key]) {
        dataMap[key] = { income: 0, expense: 0 };
      }

      if (tx.type === 'income') {
        dataMap[key].income += tx.amount;
      } else {
        dataMap[key].expense += tx.amount;
      }
    });

    return Object.entries(dataMap)
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense,
        balance: values.income - values.expense,
      }))
      .slice(-10);
  }, [filteredTransactions, timePeriod]);

  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    expense: {
      label: 'Expense',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const totalVisitors = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  const radialChartData = categoryData.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  return (
    <div className="mx-auto min-h-screen">
      <div className="flex justify-end mb-6">
        <div className="w-[200px]">
          <Select
            value={timePeriod}
            onValueChange={(value: TimePeriod) => setTimePeriod(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.timePeriod} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t.lastWeek}</SelectItem>
              <SelectItem value="month">{t.lastMonth}</SelectItem>
              <SelectItem value="year">{t.lastYear}</SelectItem>
              <SelectItem value="all">{t.allTime}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-4">{t.monthlyBalance}</h2>
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(balance, currency)}
          </div>
          <div className="text-sm text-muted-foreground mb-8">
            {totalIncome > 0 && totalExpense > 0
              ? `${((totalIncome / (totalIncome + totalExpense)) * 100).toFixed(0)}% income`
              : 'No data'}
          </div>

          <ChartContainer config={chartConfig} className="h-48 w-full">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--foreground))', r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </Card>

        {/* Radial Chart */}
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-8">{t.expenseByCategory}</h2>

          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={radialChartData}
              startAngle={0}
              endAngle={250}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar dataKey="value" background cornerRadius={10} />
            </RadialBarChart>
          </ChartContainer>

          <div className="space-y-3 mt-6">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`,
                    }}
                  />
                  <span className="text-sm">
                    {category.name} ({category.percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Transactions */}
      <Card className="p-8">
        <h2 className="text-xl font-bold mb-6">{t.topTransactions}</h2>

        <div className="grid grid-cols-2 gap-4">
          {filteredTransactions
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 6)
            .map((transaction) => (
              <Card
                key={transaction.id}
                className="p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-muted">
                    <span className="text-2xl">
                      {transaction.type === 'income' ? '💰' : '💸'}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {transaction.comment || 'Transaction'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount, currency)}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </Card>
    </div>
  );
}
