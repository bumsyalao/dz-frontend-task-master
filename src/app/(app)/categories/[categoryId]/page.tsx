import ProductsPage from '@/app/(app)/products/page';

async function getCategoryNameById(id: string): Promise<string> {
  const res = await fetch(`http://localhost:3000/api/categories/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  
  return data.data.name;
}

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const categoryName = await getCategoryNameById(params.categoryId); // Resolve category name from ID

  // Pass category name to ProductsPage as a search parameter
  return <ProductsPage searchParams={{ category: categoryName }} />;
}