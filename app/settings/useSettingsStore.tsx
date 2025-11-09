import { create } from 'zustand';

type SettingsState = {
  theme: 'light' | 'dark';
  language: 'en' | 'ru' | 'kk';
  currency: 'KZT' | 'USD' | 'EUR';
  notifications: boolean;
  faceId: boolean;
  setTheme: (t: 'light' | 'dark') => void;
  setLanguage: (l: 'en' | 'ru' | 'kk') => void;
  setCurrency: (c: 'KZT' | 'USD' | 'EUR') => void;
  toggleNotifications: () => void;
  toggleFaceId: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'light',
  language: 'en',
  currency: 'KZT',
  notifications: true,
  faceId: false,

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),
  toggleNotifications: () =>
    set((state) => ({ notifications: !state.notifications })),
  toggleFaceId: () => set((state) => ({ faceId: !state.faceId })),
}));
