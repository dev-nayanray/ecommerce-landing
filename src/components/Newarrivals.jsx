import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Newarrivals = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'home', label: 'Home & Kitchen' },
    { id: 'beauty', label: 'Beauty' }
  ];
  
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      category: "electronics",
      price: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true,
      featured: true
    },
    {
      id: 2,
      name: "Smart Fitness Band",
      category: "electronics",
      price: 79.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      category: "fashion",
      price: 149.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 4,
      name: "Premium Coffee Maker",
      category: "home",
      price: 89.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 5,
      name: "Organic Skincare Set",
      category: "beauty",
      price: 59.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 6,
      name: "Ultra-Thin Laptop",
      category: "electronics",
      price: 1199.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true,
      featured: true
    },
    {
      id: 7,
      name: "Designer Handbag",
      category: "fashion",
      price: 199.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 8,
      name: "Air Purifier",
      category: "home",
      price: 149.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581578029522-0c7b79ba6d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 9,
      name: "Noise Cancelling Headphones",
      category: "electronics",
      price: 299.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: false
    },
    {
      id: 10,
      name: "Yoga Mat",
      category: "fitness",
      price: 39.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: false
    },
    {
      id: 11,
      name: "Ceramic Cookware Set",
      category: "home",
      price: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1583778176476-4a8b02e64b01?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    },
    {
      id: 12,
      name: "Smart Home Hub",
      category: "electronics",
      price: 199.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      new: true
    }
  ];
  
  const filteredProducts = products
    .filter(product => activeFilter === 'all' || product.category === activeFilter)
    .slice(0, visibleProducts);
  
  const loadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            FRESH ARRIVALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover New Arrivals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest collection of premium products just added to the store
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group"
            >
              {/* Product image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.new && (
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
                
                {/* Quick actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                
                {/* Add to cart button */}
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700">
                  Add to Cart
                </button>
              </div>
              
              {/* Product info */}
              <div className="p-5">
                <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
                </div>
                
                {/* Pricing */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                  <button className="bg-indigo-100 hover:bg-indigo-200 transition-colors p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load more button */}
        {visibleProducts < products.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="px-8 py-3.5 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute left-0 top-1/3 z-0"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30" />
      </motion.div>
      
      <motion.div 
        className="absolute right-0 bottom-1/4 z-0"
        animate={{ 
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30" />
      </motion.div>
    </section>
  );
};

export default Newarrivals;