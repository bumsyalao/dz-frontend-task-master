import ProductsPage from '@/app/(app)/products/page';
import getCategoryNameById from '@/app/(app)/helpers/getCategoryNameById';

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const categoryName = await getCategoryNameById(params.categoryId); // Resolve category name from ID

  // Pass category name to ProductsPage as a search parameter
  return <ProductsPage searchParams={{ category: categoryName }} />;
}