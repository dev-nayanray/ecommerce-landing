import { useEffect, useState } from 'react';
import { getProducts } from '../api/ecommerceAPI';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h3 className="text-xl">{p.name}</h3>
            <p className="text-gray-500">${p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
