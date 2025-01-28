"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/(app)/context/CartContext';
import { useProductDetail } from '@/hooks/useProducts';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { addToCart } = useCart();
  const memoizedProductId = useMemo(() => params.productId, [params.productId]);

  const { product, loading } = useProductDetail(memoizedProductId);

  if (loading) return <div>Loading...</div>;
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={40}
        height={40}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-4">{product.price.currency} ${product.price.amount.toFixed(2)}</p>
      <Button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </Button>
    </div>
  );
}
