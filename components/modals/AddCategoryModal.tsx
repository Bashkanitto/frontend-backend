'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { addUserCategory } from '@/lib/userData';
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

const categoryIcons = [
  { value: 'ShoppingCart', label: '🛒 Shopping' },
  { value: 'Bus', label: '🚌 Transport' },
  { value: 'Heart', label: '❤️ Health' },
  { value: 'ShoppingBag', label: '🛍️ Retail' },
  { value: 'Gamepad2', label: '🎮 Entertainment' },
  { value: 'Plane', label: '✈️ Travel' },
];

export default function AddCategoryModal() {
  const { closeModal } = useModalStore();
  const { user } = useAuthStore();
  const { language } = useSettingsStore();
  const t = translations[language];

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('ShoppingCart');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !categoryName) return;

    addUserCategory(user.id, categoryName, selectedIcon);
    closeModal('addCategory');
    setCategoryName('');
    setSelectedIcon('ShoppingCart');
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
        <h2 className="text-2xl font-bold">{t.addCategory}</h2>
        <button
          onClick={() => closeModal('addCategory')}
          className="p-2 rounded-lg hover:bg-[var(--secondary-bg)] transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">{t.categoryName}</Label>
            <Input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder={t.categoryName}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryIcons.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => closeModal('addCategory')}
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
