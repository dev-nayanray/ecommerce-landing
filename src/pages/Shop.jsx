import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

export default function Shop() {
  // For demo, reuse ProductList component with potential for filters, pagination etc.
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-6">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 tracking-wide drop-shadow-lg">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Browse our full catalog of quality products with easy filtering and sorting.
          </p>
        </header>
        <ProductList />
      </div>
    </main>
  );
}
