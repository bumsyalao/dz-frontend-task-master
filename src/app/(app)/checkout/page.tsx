"use client";

import { useCart } from "@/app/(app)/context/CartContext";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [productNames, setProductNames] = useState<{ [key: string]: string }>({});

  // fetch name of the products
  const fetchProductNames = async () => {
    const newNames: { [key: string]: string } = {};
    for (let item of cart) {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${item.id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product ${item.id}`);
        }
        const data = await res.json();
        newNames[item.id] = data.data.name;
      } catch (error) {
        console.error("Error fetching product names", error);
      }
    }
    setProductNames(newNames);
  };

  useEffect(() => {
    if (cart.length > 0) {
      fetchProductNames();
    }
  }, [cart]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price.amount * (item.quantity || 1), 0);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and trigger API call
  const handleOrderPlacement = () => {
    if (!formData.name || !formData.address || !formData.city || !formData.postalCode || !formData.country) {
      alert("Please fill out all shipping information.");
      return;
    }

    setLoading(true);
    setError(null);

    // Map cart items to match the expected "products" format in the API
    const products = cart.map(item => ({
      id: item.id,
      quantity: item.quantity || 1,
      price: item.price.amount,
    }));

    // Prepare order data
    const orderData = {
      user: { name: formData.name, address: formData.address, city: formData.city, postalCode: formData.postalCode, country: formData.country },
      products: products,
    };

    fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to place the order.");
        }
        return res.json();
      })
      .then(() => {
        localStorage.removeItem("cart");
        setOrderPlaced(true);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setError("An error occurred while placing your order. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
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
                <span>{productNames[item.id] || ""}  ({item.quantity}x)</span>
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
            handleOrderPlacement(); // Trigger order placement here
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
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
