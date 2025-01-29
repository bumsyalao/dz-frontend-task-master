"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/(app)/context/CartContext';
import { useProductsList } from '@/hooks/useProducts';

export default function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const { addToCart } = useCart();

  // Get category from searchParams (optional query parameter)
  const category = searchParams?.category;

  // Fetch the list of products based on the category (if provided)
  const { products, loading, error } = useProductsList(category);

  // Display loading state while fetching products
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Display the page title, conditional on whether a category is provided */}
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Products in ${category}` : 'Products'}
      </h1>

      {/* Show error message if there was an issue fetching products */}
      {error && <p className="text-red-500">{error}</p>}

      {/* If products are found, display them in a grid layout */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              {/* Display product image */}
              <Image
                src={product.images[0]}  // Use the first image of the product
                alt={product.name}        // Use product name for the alt text
                width={40}                 // Set image width
                height={40}                // Set image height
                className="w-full h-48 object-cover mb-4" // Style to ensure the image covers the container and is visually appealing
              />

              {/* Display product details */}
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price.currency} ${product.price.amount.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>

              {/* Buttons for viewing product details and adding to cart */}
              <div className="mt-4 flex gap-2">
                {/* Link to product detail page */}
                <Link href={`/products/${product.id}`} className="rounded">
                  <Button variant="secondary" color="primary">View Details</Button>
                </Link>
                <Button onClick={() => addToCart(product)} className="rounded">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show message if no products are found for the selected category
        <p className="text-red-500">No products found. Please try a different category.</p>
      )}
    </div>
  );
}
