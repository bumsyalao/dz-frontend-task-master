import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/app';

export default async function ProductDetails({ params }: { params: { productId: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.productId}`);

  if (!res.ok) notFound();

  const data = await res.json();
  const product: Product =  data.data;;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={40}
        height={40}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-4">{product.price.currency} ${product.price.amount.toFixed(2)}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}