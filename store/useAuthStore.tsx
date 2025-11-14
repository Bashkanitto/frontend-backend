import { create } from 'zustand';
import { useEffect, useState } from 'react';

interface AuthState {
  isRegistered: boolean;
  setRegistered: (status: boolean) => void;
  toggleRegistered: () => void;
}

const STORAGE_KEY = 'auth_isRegistered';

export const useAuthStore = create<AuthState>((set) => ({
  isRegistered: false, // дефолтное значение, SSR-safe

  setRegistered: (status: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(status));
    }
    set({ isRegistered: status });
  },

  toggleRegistered: () =>
    set((state) => {
      const newStatus = !state.isRegistered;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, String(newStatus));
      }
      return { isRegistered: newStatus };
    }),
}));

// Хук для инициализации из localStorage на клиенте
export const useAuthInit = () => {
  const setRegistered = useAuthStore((state) => state.setRegistered);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      setRegistered(stored === 'true');
    }
  }, [setRegistered]);
};
