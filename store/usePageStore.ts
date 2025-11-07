import { create } from 'zustand';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'settings';

interface pageState {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const usePageStore = create<pageState>((set) => ({
  currentPage: 'home',
  setPage: (page) => set({ currentPage: page }),
}));
