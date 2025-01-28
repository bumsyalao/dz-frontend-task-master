"use client";

import { useCart } from "@/app/(app)/context/CartContext";
import { useState } from "react";
import getProductNameById from '@/app/(app)/helpers/getProductNameById';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price.amount * (item.quantity || 1), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderPlacement = () => {
    if (!formData.name || !formData.address || !formData.city || !formData.postalCode || !formData.country) {
      alert("Please fill out all shipping information.");
      return;
    }

    // Simulate order placement
    console.log("Order placed successfully:", {
      items: cart,
      shippingInfo: formData,
    });

    // Clear the cart and display confirmation
    localStorage.removeItem("cart");
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600">Your order has been placed successfully.</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.length > 0 ? (
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <span>
                  {getProductNameById(item.id)} ({item.quantity}x)
                </span>
                <span>
                  {item.price.currency} ${(item.price.amount * (item.quantity || 1)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p className="font-semibold text-lg">Total: ${total.toFixed(2)}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOrderPlacement();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
