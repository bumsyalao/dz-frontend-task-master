import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/app';
import { debounce } from 'lodash';

export const useProductsList = (category?: string): { products: Product[]; loading: boolean; error: string | null } => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const transformedCategory = category ? category.replace(/\s+/g, '-').toLowerCase() : undefined;
        const url = category
          ? `http://localhost:3000/api/products?category=${transformedCategory}`
          : 'http://localhost:3000/api/products';
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};


export const useProductDetail = (productId: string): { product: Product | null; loading: boolean } => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedFetchProduct = useCallback(
    debounce(async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }, 300), // Debounce for 300ms
    []
  );

  useEffect(() => {
    if (productId) {
      setLoading(true); // Start loading before fetching
      debouncedFetchProduct(productId); // Call debounced function
    }
  }, [productId, debouncedFetchProduct]);

  return { product, loading };
};

