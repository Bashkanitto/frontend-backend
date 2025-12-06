'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  comment: string;
  walletId: number;
  categoryId?: string;
  date: string;
  userId: string;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'> & { date?: string }) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getUserTransactions: (userId: string) => Transaction[];
  getTransactionsByDateRange: (
    userId: string,
    startDate: Date,
    endDate: Date
  ) => Transaction[];
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `${transaction.userId}_tx_${Date.now()}`,
          date: transaction.date || new Date().toISOString(),
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },

      updateTransaction: (id, updatedData) => {
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updatedData } : tx
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        }));
      },

      getUserTransactions: (userId) => {
        return get().transactions.filter((tx) => tx.userId === userId);
      },

      getTransactionsByDateRange: (userId, startDate, endDate) => {
        return get().transactions.filter((tx) => {
          if (tx.userId !== userId) return false;
          const txDate = new Date(tx.date);
          return txDate >= startDate && txDate <= endDate;
        });
      },
    }),
    {
      name: 'void-transactions-storage',
    }
  )
);
