'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Page =
  | 'home'
  | 'statistic'
  | 'transactions'
  | 'wallet'
  | 'categories';

interface pageState {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const usePageStore = create<pageState>((set) => ({
  currentPage: 'home',
  setPage: (page) => set({ currentPage: page }),
}));

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebarState: () => void;
  setisSidebarOpen: (value: boolean) => void;
}

export const useSidebarState = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      toggleSidebarState: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setisSidebarOpen: (value) => set({ isSidebarOpen: value }),
    }),
    {
      name: 'sidebar-state-storage',
    }
  )
);

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
