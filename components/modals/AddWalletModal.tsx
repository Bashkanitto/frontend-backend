'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { addUserWallet } from '@/lib/userData';
import { useSettingsStore } from '@/store/useSettingsStore';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const walletIcons = [
  { value: 'Wallet', label: '💳 Wallet' },
  { value: 'Banknote', label: '💵 Cash' },
  { value: 'Landmark', label: '🏦 Bank' },
];

export default function AddWalletModal() {
  const { closeModal } = useModalStore();
  const { user } = useAuthStore();
  const { language } = useSettingsStore();
  const t = translations[language];

  const [walletName, setWalletName] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Wallet');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !walletName || !balance) return;

    addUserWallet(user.id, walletName, parseFloat(balance), selectedIcon);
    closeModal('addWallet');
    setWalletName('');
    setBalance('');
    setSelectedIcon('Wallet');
    window.location.reload();
  };

  return (
    <div
      className="w-[480px] rounded-3xl p-6 shadow-xl"
      style={{
        backgroundColor: 'var(--accent-bg)',
        color: 'var(--foreground)',
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.addWallet}</h2>
        <button
          onClick={() => closeModal('addWallet')}
          className="p-2 rounded-lg hover:bg-[var(--secondary-bg)] transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2">
            <Label htmlFor="walletName">{t.walletName}</Label>
            <Input
              id="walletName"
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder={t.walletName}
            />
          </div>

          <div className="space-y-2">
            <Label>{t.selectCategory}</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {walletIcons.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="balance">{t.balance}</Label>
          <Input
            id="balance"
            type="number"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => closeModal('addWallet')}
          >
            {t.cancel}
          </Button>
          <Button type="submit" className="flex-1">
            {t.add}
          </Button>
        </div>
      </form>
    </div>
  );
}
