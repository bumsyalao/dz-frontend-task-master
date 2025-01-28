export default async function getCategoryNameById(id: string): Promise<string> {
    const res = await fetch(`http://localhost:3000/api/categories/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    
    return data.data.name;
  }
  