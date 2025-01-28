"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item: { id: string }) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((item: any) => (
            <div key={item.id} className="border p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.price.currency} ${item.price.amount.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <Button
                variant='destructive'
                onClick={() => handleRemoveFromCart(item.id)}
                className="mt-2 px-4 py-2 rounded"
              >
                Remove
              </Button>
            </div>
          ))}
          <Link href={`/checkout`}
          >
            <Button
              className="mt-4  px-4 py-2 rounded"
            >
              Proceed to Checkout
            </Button>
          </Link>

        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
