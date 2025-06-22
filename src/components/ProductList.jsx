// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/wordpressAPI'; // Import API function

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // Transform WooCommerce data to match component structure
        const transformedProducts = response.data.map(product => ({
          id: product.id,
          title: product.name,
          price: parseFloat(product.price),
          image: product.images[0]?.src || '/images/placeholder.jpg',
          rating: product.average_rating || 0,
          reviews: product.review_count || 0
        }));
        setProducts(transformedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <button 
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
        {products.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative pt-[100%] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
                    {product.title}
                  </h3>
                  <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-indigo-600 font-bold text-xl">
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => e.preventDefault()}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
 