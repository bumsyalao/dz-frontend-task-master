"use client";

import ProductsPage from "@/app/(app)/products/page";
import getCategoryNameById from "@/app/(app)/helpers/getCategoryNameById";

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  // Fetch the category name using the provided category ID
  const categoryName = await getCategoryNameById(params.categoryId);

  // Render the ProductsPage component with the retrieved category name as a search parameter
  return <ProductsPage searchParams={{ category: categoryName }} />;
}
