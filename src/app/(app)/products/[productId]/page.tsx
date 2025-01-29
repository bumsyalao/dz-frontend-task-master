"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/(app)/context/CartContext';
import { useProductDetail } from '@/hooks/useProducts';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  // UseMemo hook to memoize productId based on route params
  const { addToCart } = useCart();
  const memoizedProductId = useMemo(() => params.productId, [params.productId]);

  // Fetch product details using custom hook `useProductDetail`
  const { product, loading } = useProductDetail(memoizedProductId);

  // Show loading state while product details are being fetched
  if (loading) return <div>Loading...</div>;

  // If no product is found, trigger a notFound error
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      {/* Product card details */}
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {/* Product Image */}
      <Image
        src={product.images[0]}  // Display the first image of the product
        alt={product.name}        // Use product name as the alt text for accessibility
        width={40}                 // Set a fixed width for the image
        height={40}                // Set a fixed height for the image
        className="w-full h-64 object-cover mb-4" // Style to ensure the image covers the container and is visually appealing
      />
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-4">{product.price.currency} ${product.price.amount.toFixed(2)}</p>

      {/* Add to Cart Button */}
      <Button
        onClick={() => addToCart(product)} // Add the product to the cart when clicked
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" // Style for the button
      >
        Add to Cart
      </Button>
    </div>
  );
}
