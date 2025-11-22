'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { updateUserWallet, deleteUserWallet, Wallet } from '@/lib/userData';
import {
  Wallet as WalletIcon,
  Banknote,
  Landmark,
  Edit3,
  Trash2,
  Save,
  X,
} from 'lucide-react';

const iconMap = {
  Wallet: WalletIcon,
  Banknote: Banknote,
  Landmark: Landmark,
};

const availableIcons = [
  { name: 'Wallet', component: WalletIcon },
  { name: 'Banknote', component: Banknote },
  { name: 'Landmark', component: Landmark },
];

interface WalletEditCardProps {
  wallet: Wallet;
  iconName: string;
  currencySymbol: string;
  isOpen: boolean;
  onUpdate: () => void;
}

export function WalletEditCard({
  wallet,
  iconName,
  currencySymbol,
  isOpen,
  onUpdate,
}: WalletEditCardProps) {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(isOpen);
  const [name, setName] = useState(wallet.name);
  const [amount, setAmount] = useState(wallet.amount.toString());
  const [selectedIcon, setSelectedIcon] = useState(wallet.icon);

  const IconComponent = iconMap[iconName as keyof typeof iconMap] || WalletIcon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsEditing(false);
    updateUserWallet(
      user.id,
      wallet.id,
      name,
      parseFloat(amount),
      selectedIcon
    );
    onUpdate();
  };

  const handleDelete = async () => {
    if (!user?.id) return;

    setIsEditing(false);
    deleteUserWallet(user.id, wallet.id);
    onUpdate();
  };

  const handleCancel = () => {
    setName(wallet.name);
    setAmount(wallet.amount.toString());
    setSelectedIcon(wallet.icon);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div
        className="rounded-2xl p-6 shadow-md border border-[var(--border)]"
        style={{
          backgroundColor: 'var(--accent-bg)',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--secondary-bg)' }}
          >
            <IconComponent
              className="w-6 h-6"
              style={{ color: 'var(--foreground)' }}
            />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--secondary-bg)]"
          >
            <Edit3 className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          </button>
        </div>
        <h3 className="font-semibold text-lg mb-2">{wallet.name}</h3>
        <div className="text-2xl font-bold">
          {currencySymbol}
          {wallet.amount.toLocaleString()}
        </div>
      </div>
    );
  }

  const SelectedIcon =
    iconMap[selectedIcon as keyof typeof iconMap] || WalletIcon;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 shadow-md"
      style={{
        backgroundColor: 'var(--accent-bg)',
        color: 'var(--foreground)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--secondary-bg)' }}
        >
          <SelectedIcon
            className="w-6 h-6"
            style={{ color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2 rounded-lg transition-colors hover:bg-[var(--secondary-bg)]"
          >
            <Save className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--secondary-bg)]"
          >
            <X className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 rounded-lg transition-colors hover:bg-red-50"
            style={{ color: 'var(--foreground)' }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-xl mb-4 focus:outline-none"
        style={{
          backgroundColor: 'var(--secondary-bg)',
          color: 'var(--foreground)',
        }}
        placeholder="Wallet name"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-xl mb-4 focus:outline-none"
        style={{
          backgroundColor: 'var(--secondary-bg)',
          color: 'var(--foreground)',
        }}
        placeholder="Amount"
      />

      <div className="flex gap-2 mb-4">
        {availableIcons.map((icon) => {
          const IconComponent = icon.component;
          return (
            <button
              key={icon.name}
              type="button"
              onClick={() => setSelectedIcon(icon.name)}
              className={`p-2 rounded-lg transition-colors ${
                selectedIcon === icon.name
                  ? 'bg-[var(--secondary-bg)]'
                  : 'hover:bg-[var(--page-bg)]'
              }`}
            >
              <IconComponent
                className="w-5 h-5"
                style={{ color: 'var(--foreground)' }}
              />
            </button>
          );
        })}
      </div>
    </form>
  );
}
