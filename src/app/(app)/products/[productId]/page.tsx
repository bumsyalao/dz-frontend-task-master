"use client"; 

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/app';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/(app)/context/CartContext';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${params.productId}`);
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]); // Trigger refetch when productId changes

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

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
