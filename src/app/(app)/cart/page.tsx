"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from '@/app/(app)/context/CartContext';

export default function CartPage() {

  const { cart, removeFromCart, updateQuantity } = useCart();

  // Function to handle quantity change
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return; // Prevent setting quantity to less than 1
    updateQuantity(id, quantity); // Update quantity in the cart context
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((item: any) => (
            <div key={item.id} className="border p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">
                {item.price.currency} ${item.price.amount.toFixed(2)}
              </p>
              {/* Quantity controls */}
              <div className="flex items-center">
                <p className="text-gray-600">Quantity</p>
                <Button
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="mr-2 px-2 py-1 rounded"
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="ml-2 px-2 py-1 rounded"
                >
                  +
                </Button>
              </div>
              {/* Button to remove item from cart */}
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
                className="mt-2 px-4 py-2 rounded"
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Link to proceed to checkout */}
          <Link href={`/checkout`}>
            <Button className="mt-4 px-4 py-2 rounded">Proceed to Checkout</Button>
          </Link>
        </div>
      ) : (
        // Display message if cart is empty
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
