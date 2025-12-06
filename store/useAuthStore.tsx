import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    emailOrUsername: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => void;
}

const USERS_KEY = 'void_users';

const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=${value}; path=/; max-age=2592000; SameSite=Lax`;
  },
  removeItem: (name: string): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      register: async (username: string, email: string, password: string) => {
        try {
          const usersData = localStorage.getItem(USERS_KEY);
          const users: User[] = usersData ? JSON.parse(usersData) : [];

          const emailExists = users.some(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );
          if (emailExists) {
            return { success: false, error: 'Email already registered' };
          }

          const usernameExists = users.some(
            (u) => u.username.toLowerCase() === username.toLowerCase()
          );
          if (usernameExists) {
            return { success: false, error: 'Username already taken' };
          }

          const newUser: User = {
            id: Date.now().toString(),
            username,
            email,
            createdAt: new Date().toISOString(),
          };

          const passwordsData = localStorage.getItem('void_passwords');
          const passwords = passwordsData ? JSON.parse(passwordsData) : {};
          passwords[newUser.id] = password;
          localStorage.setItem('void_passwords', JSON.stringify(passwords));

          users.push(newUser);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));

          set({ user: newUser, isAuthenticated: true });

          return { success: true };
        } catch (error) {
          console.error('Registration error:', error);
          return { success: false, error: 'Registration failed' };
        }
      },

      login: async (emailOrUsername: string, password: string) => {
        try {
          const usersData = localStorage.getItem(USERS_KEY);
          const users: User[] = usersData ? JSON.parse(usersData) : [];

          const user = users.find(
            (u) =>
              u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
              u.username.toLowerCase() === emailOrUsername.toLowerCase()
          );

          if (!user) {
            return { success: false, error: 'User not found' };
          }

          const passwordsData = localStorage.getItem('void_passwords');
          const passwords = passwordsData ? JSON.parse(passwordsData) : {};
          const storedPassword = passwords[user.id];

          if (storedPassword !== password) {
            return { success: false, error: 'Incorrect password' };
          }

          set({ user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('Login error:', error);
          return { success: false, error: 'Login failed' };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const state = get();
        if (state.user && !state.isAuthenticated) {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'void-auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const localValue = localStorage.getItem(name);
          if (localValue) {
            cookieStorage.setItem(name, localValue);
          }
          return localValue;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, value);
          cookieStorage.setItem(name, value);
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          cookieStorage.removeItem(name);
        },
      })),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
