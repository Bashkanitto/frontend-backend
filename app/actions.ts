'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export type Category = {
  id: string;
  name: string;
  icon: string;
  userId: string;
};

export type Wallet = {
  id: number;
  name: string;
  amount: number;
  icon: string;
  userId: string;
};

// Получаем ID текущего пользователя из cookies
async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('void-auth-storage');
  
  if (!authCookie?.value) return null;
  
  try {
    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    return authData.state?.user?.id || null;
  } catch {
    return null;
  }
}

// Получаем данные из localStorage на сервере (через cookies)
function getStorageData<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

function setStorageData<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Дефолтные данные для нового пользователя
const defaultCategories: Omit<Category, 'userId'>[] = [
  { id: '1', name: 'Food', icon: 'ShoppingCart' },
  { id: '2', name: 'Transport', icon: 'Bus' },
  { id: '3', name: 'Health', icon: 'Heart' },
  { id: '4', name: 'Shopping', icon: 'ShoppingBag' },
  { id: '5', name: 'Entertainment', icon: 'Gamepad2' },
  { id: '6', name: 'Travel', icon: 'Plane' },
];

const defaultWallets: Omit<Wallet, 'userId'>[] = [
  { id: 1, name: 'Wallet', amount: 3000, icon: 'Wallet' },
  { id: 2, name: 'Cash', amount: 6000, icon: 'Banknote' },
  { id: 3, name: 'Savings', amount: 1000, icon: 'Landmark' },
];

export async function getCategories(): Promise<Category[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  // В серверных компонентах используем workaround через клиентскую инициализацию
  if (typeof window === 'undefined') {
    // Возвращаем дефолтные категории для SSR
    return defaultCategories.map(cat => ({ ...cat, userId }));
  }

  const allCategories = getStorageData<Category[]>('void_categories') || [];
  let userCategories = allCategories.filter(cat => cat.userId === userId);

  // Если у пользователя нет категорий - создаём дефолтные
  if (userCategories.length === 0) {
    userCategories = defaultCategories.map(cat => ({ ...cat, userId }));
    setStorageData('void_categories', [...allCategories, ...userCategories]);
  }

  return userCategories;
}

export async function getWallets(): Promise<Wallet[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  // В серверных компонентах используем workaround через клиентскую инициализацию
  if (typeof window === 'undefined') {
    // Возвращаем дефолтные кошельки для SSR
    return defaultWallets.map(wallet => ({ ...wallet, userId }));
  }

  const allWallets = getStorageData<Wallet[]>('void_wallets') || [];
  let userWallets = allWallets.filter(wallet => wallet.userId === userId);

  // Если у пользователя нет кошельков - создаём дефолтные
  if (userWallets.length === 0) {
    userWallets = defaultWallets.map(wallet => ({ ...wallet, userId }));
    setStorageData('void_wallets', [...allWallets, ...userWallets]);
  }

  return userWallets;
}

export async function addCategory(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;
  
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    icon,
    userId,
  };
  
  if (typeof window !== 'undefined') {
    const allCategories = getStorageData<Category[]>('void_categories') || [];
    allCategories.push(newCategory);
    setStorageData('void_categories', allCategories);
  }

  revalidatePath('/categories');
  redirect('/categories');
}

export async function updateCategory(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  if (typeof window !== 'undefined') {
    const allCategories = getStorageData<Category[]>('void_categories') || [];
    const updatedCategories = allCategories.map(cat => 
      cat.id === id && cat.userId === userId 
        ? { ...cat, name, icon } 
        : cat
    );
    setStorageData('void_categories', updatedCategories);
  }

  revalidatePath('/categories');
  redirect(`/categories?open=${id}`);
}

export async function deleteCategory(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const id = formData.get('id') as string;
  
  if (typeof window !== 'undefined') {
    const allCategories = getStorageData<Category[]>('void_categories') || [];
    const filteredCategories = allCategories.filter(
      cat => !(cat.id === id && cat.userId === userId)
    );
    setStorageData('void_categories', filteredCategories);
  }
  
  revalidatePath('/categories');
  redirect('/categories');
}

export async function addWallet(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const name = formData.get('name') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const icon = formData.get('icon') as string;
  
  const newWallet: Wallet = {
    id: Date.now(),
    name,
    amount,
    icon,
    userId,
  };
  
  if (typeof window !== 'undefined') {
    const allWallets = getStorageData<Wallet[]>('void_wallets') || [];
    allWallets.push(newWallet);
    setStorageData('void_wallets', allWallets);
  }

  revalidatePath('/wallet');
  redirect('/wallet');
}

export async function updateWallet(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const id = parseInt(formData.get('id') as string);
  const name = formData.get('name') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const icon = formData.get('icon') as string;

  if (typeof window !== 'undefined') {
    const allWallets = getStorageData<Wallet[]>('void_wallets') || [];
    const updatedWallets = allWallets.map(wallet => 
      wallet.id === id && wallet.userId === userId
        ? { ...wallet, name, amount, icon } 
        : wallet
    );
    setStorageData('void_wallets', updatedWallets);
  }

  revalidatePath('/wallet');
  redirect(`/wallet?open=${id}`);
}

export async function deleteWallet(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const id = parseInt(formData.get('id') as string);
  
  if (typeof window !== 'undefined') {
    const allWallets = getStorageData<Wallet[]>('void_wallets') || [];
    const filteredWallets = allWallets.filter(
      wallet => !(wallet.id === id && wallet.userId === userId)
    );
    setStorageData('void_wallets', filteredWallets);
  }
  
  revalidatePath('/wallet');
  redirect('/wallet');
}