"use client";

import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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
        <p className="text-red-500">No categories available.</p>
      )}
    </div>
  );
}
