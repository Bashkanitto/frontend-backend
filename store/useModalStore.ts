import { create } from 'zustand';

type ModalName =
  | 'add'
  | 'addCategory'
  | 'addWallet'
  | 'profile'
  | 'profileMenu'
  | 'settings'
  | 'logout';

type ModalStore = {
  openModal: (name: ModalName) => void;
  closeModal: (name: ModalName) => void;
  isOpen: (name: ModalName) => boolean;
  modals: Record<ModalName, boolean>;
  closeAll: () => void;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {
    add: false,
    addCategory: false,
    addWallet: false,
    profile: false,
    profileMenu: false,
    settings: false,
    logout: false,
  },

  openModal: (name) =>
    set((state) => ({ modals: { ...state.modals, [name]: true } })),

  closeModal: (name) =>
    set((state) => ({ modals: { ...state.modals, [name]: false } })),

  isOpen: (name) => get().modals[name],

  closeAll: () =>
    set((state) => ({
      modals: Object.fromEntries(
        Object.keys(state.modals).map((key) => [key, false])
      ) as Record<ModalName, boolean>,
    })),
}));