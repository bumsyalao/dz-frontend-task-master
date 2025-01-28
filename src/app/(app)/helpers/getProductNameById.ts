export default async function getProductNameById(id: string): Promise<string> {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    
    return data.data.name;
  }
  