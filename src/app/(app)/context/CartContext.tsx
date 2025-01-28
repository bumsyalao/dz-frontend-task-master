"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LineItem } from '@/types/app';
import { Product } from '@/types/app';
import { debounce } from 'lodash';

interface CartContextType {
  cart: LineItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<LineItem[]>([]);

  // Read cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
  }, []); // Empty dependency array means this only runs on mount

  useEffect(() => {
    // Log cart state to localStorage whenever it updates
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Debounced function to add item to cart
  const throttledAddToCart = useCallback(
    debounce((product: Product) => {
      setCart((prev) => {
        const existingItem = prev.find((item) => item.referenceId === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.referenceId === product.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          );
        }
  
        return [
          ...prev,
          {
            id: product.id,
            referenceId: product.id,
            type: 'PRODUCT',
            price: product.price,
            quantity: 1,
          },
        ];
      });
    }, 300),
    [] // This ensures the debounce is only initialized once
  );  

  // Add to cart handler
  const addToCart = (product: Product) => {
    throttledAddToCart(product);
    alert('Added to cart');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
