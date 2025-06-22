import { useEffect, useState } from 'react';
import { getCategories } from '../api/ecommerceAPI';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  return (
    <section className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <span key={cat.id} className="bg-blue-100 px-4 py-2 rounded">
            {cat.name}
          </span>
        ))}
      </div>
    </section>
  );
}
