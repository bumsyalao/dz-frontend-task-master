import Link from 'next/link';

export interface Category {
  id: string;
  name: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:3000/api/categories');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  return data.data;
}

export default async function CategoriesPage() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {categories.length > 0 ? (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.id}`}
                className="text-blue-500 hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      )}
    </div>
  );
}
