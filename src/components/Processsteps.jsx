import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Processsteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore our extensive collection of premium products across various categories",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your desired items and add them to your shopping cart",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Secure Checkout",
      description: "Complete your purchase with our safe and encrypted payment process",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Receive your order quickly with our express shipping options",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    }
  ];

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our seamless shopping experience makes getting what you love effortless
          </p>
        </div>

        {/* Steps visualization */}
        <div className="relative hidden md:block">
          {/* Progress line */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-gray-200 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative grid grid-cols-4 gap-8 z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl"
                      : "bg-white text-indigo-500 shadow-md"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="text-4xl">
                    {step.icon}
                  </div>
                  
                  {/* Step number */}
                  <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    activeStep === index 
                      ? "bg-white text-indigo-600 shadow-md"
                      : "bg-indigo-100 text-indigo-600"
                  }`}>
                    {index + 1}
                  </div>
                </motion.div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  activeStep === index ? "text-indigo-600" : "text-gray-800"
                }`}>
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile steps */}
        <div className="md:hidden">
          <div className="relative pl-8 border-l-2 border-indigo-200">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative mb-10 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Step indicator */}
                <div className={`absolute -left-11 top-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  activeStep === index 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md"
                    : "bg-indigo-100 text-indigo-600"
                }`}>
                  {index + 1}
                </div>
                
                <div 
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeStep === index 
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-md"
                      : "bg-white"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      activeStep === index 
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-100 text-indigo-500"
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${
                        activeStep === index ? "text-indigo-600" : "text-gray-800"
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active step details */}
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden border border-indigo-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-4">
                STEP {activeStep + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {steps[activeStep].description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="h-80 md:h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
              
              {/* Animated demo elements */}
              {activeStep === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-white rounded-2xl shadow-xl p-4 max-w-xs"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(item => (
                        <div key={item} className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                  </motion.div>
                </div>
              )}
              
              {activeStep === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-64">
                      <div className="flex justify-between items-center mb-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                          <div className="h-3 bg-gray-200 rounded w-16" />
                        </div>
                      </div>
                      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      x: [0, 20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-white rounded-2xl shadow-xl p-6 w-72"
                  >
                    <div className="flex gap-4 mb-6">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-12" />
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-12" />
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-12" />
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium">
                      Pay Now
                    </button>
                  </motion.div>
                </div>
              )}
              
              {activeStep === 3 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      x: [0, -30, 0],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <div className="bg-gray-800 w-48 h-32 rounded-lg" />
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 w-56">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">Order Delivered!</div>
                            <div className="text-sm text-gray-500">Your package has arrived</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute left-0 top-1/4 -z-10">
          <div className="w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="absolute right-0 bottom-1/4 -z-10">
          <div className="w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default Processsteps;