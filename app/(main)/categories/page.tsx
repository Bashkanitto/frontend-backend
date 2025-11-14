import { getCategories } from '../../actions';
import { CategoryEditForm } from '@/components/CategoryEditForm';

interface CategoriesPageProps {
  searchParams: {
    open?: string;
  };
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const categories = await getCategories();
  const openCategoryId = searchParams.open;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryEditForm
          key={category.id}
          category={category}
          isOpen={category.id === openCategoryId}
        />
      ))}
    </div>
  );
}
