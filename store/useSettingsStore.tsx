'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';
type Language = 'ru' | 'en';
type Currency = 'KZT' | 'USD' | 'EUR';

interface SettingsState {
  themeMode: ThemeMode;
  language: Language;
  currency: Currency;
  setThemeMode: (mode: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      language: 'en',
      currency: 'USD',
      setThemeMode: (mode) => set({ themeMode: mode }),
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (curr) => set({ currency: curr }),
    }),
    {
      name: 'void-settings-storage',
    }
  )
);
