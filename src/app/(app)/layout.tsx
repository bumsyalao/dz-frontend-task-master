import { CartProvider } from '@/app/(app)/context/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          </CartProvider>
      </body>
    </html>
  );
}