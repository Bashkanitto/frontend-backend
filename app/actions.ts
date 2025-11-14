'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Wallet = {
  id: number;
  name: string;
  amount: number;
  icon: string;
};

let categories: Category[] = [
  { id: '1', name: 'Food', icon: 'ShoppingCart' },
  { id: '2', name: 'Transport', icon: 'Bus' },
  { id: '3', name: 'Health', icon: 'Heart' },
  { id: '4', name: 'Shopping', icon: 'ShoppingBag' },
  { id: '5', name: 'Entertainment', icon: 'Gamepad2' },
  { id: '6', name: 'Travel', icon: 'Plane' },
];

let wallets: Wallet[] = [
  { id: 1, name: 'Wallet', amount: 3000, icon: 'Wallet' },
  { id: 2, name: 'Cash', amount: 6000, icon: 'Banknote' },
  { id: 3, name: 'Savings', amount: 1000, icon: 'Landmark' },
];

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getWallets(): Promise<Wallet[]> {
  return wallets;
}

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;
  
  const newCategory = {
    id: Date.now().toString(),
    name,
    icon
  };
  
  categories.push(newCategory);
  revalidatePath('/categories');
  redirect('/categories');
}

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  categories = categories.map(cat => 
    cat.id === id ? { ...cat, name, icon } : cat
  );

  revalidatePath('/categories');
  redirect(`/categories?open=${id}`);
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string;
  
  categories = categories.filter(cat => cat.id !== id);
  
  revalidatePath('/categories');
  redirect('/categories');
}

export async function addWallet(formData: FormData) {
  const name = formData.get('name') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const icon = formData.get('icon') as string;
  
  const newWallet = {
    id: Date.now(),
    name,
    amount,
    icon
  };
  
  wallets.push(newWallet);
  revalidatePath('/wallet');
  redirect('/wallet');
}

export async function updateWallet(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const name = formData.get('name') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const icon = formData.get('icon') as string;

  wallets = wallets.map(wallet => 
    wallet.id === id ? { ...wallet, name, amount, icon } : wallet
  );

  revalidatePath('/wallet');
  redirect(`/wallet?open=${id}`);
}

export async function deleteWallet(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  
  wallets = wallets.filter(wallet => wallet.id !== id);
  
  revalidatePath('/wallet');
  redirect('/wallet');
}