'use client';

import { create } from 'zustand';
import { persist} from 'zustand/middleware';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'categories';

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

// сохраняем состояние sidebar
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
