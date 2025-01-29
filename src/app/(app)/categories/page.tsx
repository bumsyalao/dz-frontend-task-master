"use client";

import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';

export default function CategoriesPage() {
  // Fetch categories using a custom hook
  const { categories, loading, error } = useCategories();

  // Display a loading state while fetching data
  if (loading) return <div>Loading categories...</div>;

  // Display an error message if fetching fails
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Render category list if available */}
      {categories.length > 0 ? (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id}>
              {/* Link to category-specific product page */}
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
        // Display a message if no categories are found
        <p className="text-red-500">No categories available.</p>
      )}
    </div>
  );
}
