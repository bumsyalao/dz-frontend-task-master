import { CartProvider } from '@/app/(app)/context/CartContext';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="container mx-auto p-4">
            {/* Common Header and Navigation Links */}
            <h1 className="text-2xl font-bold mb-4">Welcome to E-Commerce Store</h1>
            <div className="flex gap-4 mb-8">
              <Link href="/" className="text-blue-500 hover:underline">
                All products
              </Link>
              <Link href="/categories" className="text-blue-500 hover:underline">
                Categories
              </Link>
              <Link href="/cart" className="text-blue-500 hover:underline">
                Cart
              </Link>
              <Link href="/orders" className="text-blue-500 hover:underline">
                Orders
              </Link>
            </div>
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}