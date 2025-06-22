import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Flashsale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 30,
    seconds: 0
  });
  
  const [saleProgress, setSaleProgress] = useState([
    { name: 'Headphones', sold: 45, total: 100 },
    { name: 'Smartwatch', sold: 72, total: 100 },
    { name: 'Camera', sold: 18, total: 100 },
    { name: 'Sneakers', sold: 89, total: 100 }
  ]);

  const flashProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      category: "Electronics",
      originalPrice: 249.99,
      salePrice: 149.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      sold: 45,
      total: 100
    },
    {
      id: 2,
      name: "Smart Fitness Watch Pro",
      category: "Wearables",
      originalPrice: 299.99,
      salePrice: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.6,
      sold: 72,
      total: 100
    },
    {
      id: 3,
      name: "4K Digital Camera Bundle",
      category: "Photography",
      originalPrice: 599.99,
      salePrice: 399.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.9,
      sold: 18,
      total: 100
    },
    {
      id: 4,
      name: "Running Sneakers Pro",
      category: "Footwear",
      originalPrice: 129.99,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.7,
      sold: 89,
      total: 100
    }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev;
        
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        
        if (seconds === 0) {
          if (minutes === 0) {
            return { hours: hours - 1, minutes: 59, seconds: 59 };
          }
          return { hours, minutes: minutes - 1, seconds: 59 };
        }
        
        return { hours, minutes, seconds: seconds - 1 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Calculate percentage sold
  const calculatePercentage = (sold, total) => Math.round((sold / total) * 100);

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header with countdown */}
        <div className="text-center mb-12">
          <span className="inline-block bg-rose-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
            FLASH SALE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Deal of the Day
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Limited time offers on premium products. Hurry before they're gone!
          </p>
          
          {/* Countdown timer */}
          <div className="mt-8 flex justify-center">
            <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl shadow-xl p-1 inline-block">
              <div className="flex gap-2 md:gap-4 bg-white rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">Hours</div>
                </div>
                <div className="text-3xl font-bold text-gray-300 flex items-center">:</div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">Minutes</div>
                </div>
                <div className="text-3xl font-bold text-gray-300 flex items-center">:</div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {saleProgress.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="font-bold text-rose-600">{item.sold}/{item.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculatePercentage(item.sold, item.total)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <div className="mt-2 text-right text-sm text-gray-500">
                {calculatePercentage(item.sold, item.total)}% Sold
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group"
            >
              <div className="relative">
                {/* Sale badge */}
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {calculatePercentage(product.sold, product.total)}% SOLD
                </div>
                
                {/* Product image */}
                <div className="h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Quick add to cart */}
                <button className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              
              <div className="p-5">
                <span className="text-xs text-gray-500">{product.category}</span>
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
                  <div>
                    <span className="text-xl font-bold text-rose-600">${product.salePrice.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  
                  {/* Discount percentage */}
                  <div className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-sm font-bold">
                    {Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Sold: {product.sold}/{product.total}</span>
                    <span>Hurry! Only {product.total - product.sold} left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full" 
                      style={{ width: `${calculatePercentage(product.sold, product.total)}%` }}
                    />
                  </div>
                </div>
                
                {/* Add to cart button */}
                <button className="mt-4 w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3.5 text-base font-semibold text-rose-600 border border-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
            View All Flash Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default Flashsale;