import React, { useState } from 'react';
import Categories from '../components/Categories';
import { motion } from 'framer-motion';

export default function Category() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', name: 'All Categories' },
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New Arrivals' },
    { id: 'sale', name: 'On Sale' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full blur-[100px] opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full blur-[100px] opacity-40 -z-10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              backgroundColor: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#ec4899' : '#8b5cf6',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Dark mode toggle */}
        <div className="absolute top-6 right-4 md:right-6">
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
            aria-label="Toggle dark mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <motion.header 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 rounded-full">
              <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-1.5">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  EXPLORE COLLECTIONS
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Shop by Category
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore our diverse range of premium collections tailored to your lifestyle
          </motion.p>
          
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </motion.div>
        </motion.header>
        
        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Categories />
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Can't find what you're looking for?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Contact Our Team
            </button>
            <button className="px-8 py-3.5 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl border border-indigo-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
              Request Custom Order
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Floating action button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <button className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </motion.div>
    </main>
  );
}