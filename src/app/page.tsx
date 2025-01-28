import ProductList from '@/app/(app)/products/page';
import Layout from '@/app/(app)/layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        {/* Render ProductList component */}
        <ProductList />
      </div>
    </Layout>
  );
}