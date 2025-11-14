import Image from 'next/image';
import { updateCategory, deleteCategory, type Category } from '../app/actions';

type CategoryEditFormProps = {
  category: Category;
  isOpen?: boolean;
};

export function CategoryEditForm({
  category,
  isOpen = false,
}: CategoryEditFormProps) {
  return (
    <div className="m-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
      <details className="group" open={isOpen}>
        <summary className="h-15 flex px-3 items-center justify-between gap-3 cursor-pointer list-none">
          <div className="flex items-center gap-3">
            <Image
              className="mx-2"
              alt="categoryicon"
              height={30}
              width={30}
              src={category.icon}
            />
            <span className="text-lg font-medium text-black">
              {category.name}
            </span>
          </div>
          <Image
            alt="editicon"
            height={20}
            width={20}
            src="/icons/edit_icon.svg"
            className="group-open:rotate-180 transition-transform"
          />
        </summary>

        <div className="px-4 pb-4 pt-2 border-t border-gray-200">
          <form action={updateCategory} className="space-y-3">
            <input type="hidden" name="id" value={category.id} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={category.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Path
              </label>
              <input
                type="text"
                name="icon"
                defaultValue={category.icon}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                type="submit"
                formAction={deleteCategory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}
