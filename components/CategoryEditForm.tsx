'use client';

import { useState } from 'react';
import { updateCategory, deleteCategory, Category } from '../app/actions';
import {
  ShoppingCart,
  Bus,
  Heart,
  ShoppingBag,
  Gamepad2,
  Plane,
  Wallet,
  Banknote,
  Landmark,
  Edit3,
  Trash2,
  Save,
  X,
} from 'lucide-react';

const iconMap = {
  ShoppingCart,
  Bus,
  Heart,
  ShoppingBag,
  Gamepad2,
  Plane,
  Wallet,
  Banknote,
  Landmark,
};

const availableIcons = [
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'Bus', component: Bus },
  { name: 'Heart', component: Heart },
  { name: 'ShoppingBag', component: ShoppingBag },
  { name: 'Gamepad2', component: Gamepad2 },
  { name: 'Plane', component: Plane },
  { name: 'Wallet', component: Wallet },
  { name: 'Banknote', component: Banknote },
  { name: 'Landmark', component: Landmark },
];

interface CategoryEditFormProps {
  category: Category;
  isOpen: boolean;
}

export function CategoryEditForm({ category, isOpen }: CategoryEditFormProps) {
  const [isEditing, setIsEditing] = useState(isOpen);
  const [name, setName] = useState(category.name);
  const [selectedIcon, setSelectedIcon] = useState(category.icon);

  const CategoryIcon = iconMap[selectedIcon as keyof typeof iconMap] || ShoppingCart;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    const formData = new FormData();
    formData.append('id', category.id);
    formData.append('name', name);
    formData.append('icon', selectedIcon);
    await updateCategory(formData);
  };

  const handleDelete = async () => {
    setIsEditing(false);
    const formData = new FormData();
    formData.append('id', category.id);
    await deleteCategory(formData);
  };

  const handleCancel = () => {
    setName(category.name);
    setSelectedIcon(category.icon);
    setIsEditing(false);
  };

  if (!isEditing) {
    const DisplayIcon = iconMap[category.icon as keyof typeof iconMap] || ShoppingCart;

    return (
      <div
        className="rounded-2xl p-6 shadow-md w-64 border border-[var(--border)]"
        style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--secondary-bg)' }}
          >
            <DisplayIcon className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--secondary-bg)]"
          >
            <Edit3 className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          </button>
        </div>
        <h3 className="font-semibold text-lg">{category.name}</h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 shadow-md w-64"
      style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--secondary-bg)' }}
        >
          <CategoryIcon className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
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
        style={{ backgroundColor: 'var(--secondary-bg)', color: 'var(--foreground)' }}
        placeholder="Category name"
      />

      <div className="grid grid-cols-3 gap-2 mb-4">
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
              <IconComponent className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
            </button>
          );
        })}
      </div>
    </form>
  );
}
