'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getUserCategories, Category } from '@/lib/userData';
import { CategoryEditForm } from '@/components/CategoryEditForm';
import { useSearchParams } from 'next/navigation';

export default function CategoriesPage() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const openCategoryId = searchParams.get('open');

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (user?.id) {
      const userCategories = getUserCategories(user.id);
      setCategories(userCategories);
    }
  }, [user]);

  const handleUpdate = () => {
    if (user?.id) {
      const userCategories = getUserCategories(user.id);
      setCategories(userCategories);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryEditForm
          key={category.id}
          category={category}
          isOpen={category.id === openCategoryId}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
