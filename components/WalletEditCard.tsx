'use client';

import { useState } from 'react';
import { updateWallet, deleteWallet, Wallet } from '../app/actions';
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
}

export function WalletEditCard({
  wallet,
  iconName,
  currencySymbol,
  isOpen,
}: WalletEditCardProps) {
  const [isEditing, setIsEditing] = useState(isOpen);
  const [name, setName] = useState(wallet.name);
  const [amount, setAmount] = useState(wallet.amount.toString());
  const [selectedIcon, setSelectedIcon] = useState(wallet.icon);

  const IconComponent = iconMap[iconName as keyof typeof iconMap] || WalletIcon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditing(false);

    const formData = new FormData();
    formData.append('id', wallet.id.toString());
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('icon', selectedIcon);
    await updateWallet(formData);
  };

  const handleDelete = async () => {
    setIsEditing(false);

    const formData = new FormData();
    formData.append('id', wallet.id.toString());
    await deleteWallet(formData);
  };

  const handleCancel = () => {
    setName(wallet.name);
    setAmount(wallet.amount.toString());
    setSelectedIcon(wallet.icon);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
            <IconComponent className="w-6 h-6" />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
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
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
          <SelectedIcon className="w-6 h-6" />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-gray-400"
        placeholder="Wallet name"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-gray-400"
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
                selectedIcon === icon.name ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </form>
  );
}
