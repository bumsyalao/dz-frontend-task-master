import ProductList from '@/app/(app)/products/page';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to E-Commerce Store</h1>
      
      <div className="flex gap-4 mb-8">
        <a href="/categories" className="text-blue-500 hover:underline">
          Categories
        </a>
        <a href="/cart" className="text-blue-500 hover:underline">
          Cart
        </a>
        <a href="/orders" className="text-blue-500 hover:underline">
          Orders
        </a>
      </div>

      {/* Render ProductList component */}
      <ProductList />
    </div>
  );
}