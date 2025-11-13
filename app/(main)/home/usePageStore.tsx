import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'settings';

interface pageState {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const usePageStore = create<pageState>((set) => ({
  currentPage: 'home',
  setPage: (page) => set({ currentPage: page }),
}));

interface SidebarState {
  isOpen: boolean;
  toggleSidebarState: () => void;
  setIsOpen: (value: boolean) => void;
}

// сохраняем состояние sidebar
export const useSidebarState = create<SidebarState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      toggleSidebarState: () => set({ isOpen: !get().isOpen }),
      setIsOpen: (value) => set({ isOpen: value }),
    }),
    {
      name: 'sidebar-state-storage',
    }
  )
);

// состояние без сохранения в localstore
// export const useSidebarState = create<SidebarState>((set) => ({
//     isOpen: false,
//     toggleState: () =>
//         set((state) => ({ isOpen: !state.isOpen })),
//     setIsOpen: (value) =>
//         set({ isOpen: value })
// }))
