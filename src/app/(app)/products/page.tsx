"use client"; 

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/app';
import { useCart } from '@/app/(app)/context/CartContext'; 

const getProducts = async (category?: string): Promise<Product[]> => {
  // Transform the category name (replace spaces with hyphens and lowercase it)
  const transformedCategory = category ? category.replace(/\s+/g, '-').toLowerCase() : undefined;
  const url = category ? `http://localhost:3000/api/products?category=${transformedCategory}` : 'http://localhost:3000/api/products';
  const res = await fetch(url, { cache: 'no-store' }); // Disable caching for fresh data
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.data;
};

export default function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const { addToCart } = useCart();
  const category = searchParams?.category;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts(category);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch when category changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Products in Category: ${category}` : 'Products'}
      </h1>
      
      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={40}
                height={40}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price.currency} ${product.price.amount.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>
              <div className="mt-4 flex gap-2">
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
        <p className="text-red-500">No products found. Please try a different category.</p>
      )}
    </div>
  );
}
