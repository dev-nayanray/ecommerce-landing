import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');

  // Demo products with real images
  const demoProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      featured: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch Pro",
      category: "Wearables",
      price: 199.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      category: "Home & Kitchen",
      price: 89.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      category: "Accessories",
      price: 149.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      featured: true
    },
    {
      id: 5,
      name: "Ultra-Thin Laptop",
      category: "Electronics",
      price: 1199.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
      id: 6,
      name: "Running Sneakers",
      category: "Footwear",
      price: 129.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
      id: 7,
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      price: 89.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
      id: 8,
      name: "Smart Home Speaker",
      category: "Electronics",
      price: 79.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call with demo products
    setTimeout(() => {
      setProducts(demoProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    // Featured: show newest first (by id)
    return b.id - a.id;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Products</h2>
            <p className="text-gray-600 mt-2">Handpicked selection of quality items</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <label htmlFor="sort" className="text-gray-700 mr-2">Sort by:</label>
            <select 
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 animate-pulse" />
                <div className="p-5">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-1/4" />
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700">
                    Add to Cart
                  </button>
                  
                  {/* "New" badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                    </div>
                    {product.featured && (
                      <div className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                      {product.price > 100 && (
                        <span className="text-gray-400 text-sm line-through ml-2">${(product.price * 1.2).toFixed(2)}</span>
                      )}
                    </div>
                    <button className="bg-indigo-100 hover:bg-indigo-200 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <button className="px-8 py-3.5 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}