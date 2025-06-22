import React, { useState } from 'react';
import ProductList from '../components/ProductList';

// Floating particles component for background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full opacity-10 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            backgroundColor: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#ec4899' : '#8b5cf6',
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

// Floating gradient elements
const FloatingElements = () => {
  return (
    <>
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
    </>
  );
};

// Gradient border card
const GradientCard = ({ children }) => {
  return (
    <div className="relative p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 h-full">
        {children}
      </div>
    </div>
  );
};

export default function Product() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className={`min-h-screen py-16 transition-colors duration-500 ${isDarkMode ? 'dark bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <FloatingParticles />
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Dark mode toggle */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
            aria-label="Toggle dark mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <header className="mb-16 text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="inline-block mb-6">
            <GradientCard>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">PREMIUM COLLECTION</span>
            </GradientCard>
          </div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Exclusive Products
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the best products curated just for you. Quality and style combined.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              New Arrivals
            </button>
            <button className="px-8 py-3.5 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl border border-indigo-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
              View All Categories
            </button>
          </motion.div>
        </header>

        {/* Featured product showcase */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GradientCard>
              <div className="text-center p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Quality Craftsmanship</h3>
                <p className="text-gray-600 dark:text-gray-300">Each product is meticulously designed and crafted for perfection.</p>
              </div>
            </GradientCard>
            
            <GradientCard>
              <div className="text-center p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sustainable Materials</h3>
                <p className="text-gray-600 dark:text-gray-300">Ethically sourced materials that are kind to our planet.</p>
              </div>
            </GradientCard>
            
            <GradientCard>
              <div className="text-center p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600 dark:text-gray-300">Our confidence in quality backed by lifetime warranty.</p>
              </div>
            </GradientCard>
          </div>
        </section>

        <ProductList />
      </div>
      
      {/* Floating action button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </main>
  );
}

// Framer Motion integration
const motion = {
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
  h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  p: ({ children, ...props }) => <p {...props}>{children}</p>
};

// CSS styles for animations
const styles = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes pulse-slow {
    0% { opacity: 0.1; }
    50% { opacity: 0.2; }
    100% { opacity: 0.1; }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
  }
  
  .dark .gradient-border {
    background: linear-gradient(45deg, #4f46e5, #7c3aed, #db2777);
  }
  
  .product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .dark .product-card {
    background: linear-gradient(145deg, #1e293b, #0f172a);
  }
`;