import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 to-purple-800 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 backdrop-blur-sm">
              STAY CONNECTED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
              Subscribe to receive exclusive offers, product updates, and industry insights
            </p>
          </motion.div>
          
          {/* Success message */}
          <AnimatePresence>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white font-medium">Thank you for subscribing! Check your email for a welcome gift.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-grow">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
                  disabled={isSubscribed || isLoading}
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className={`px-8 py-3.5 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                isSubscribed 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : isLoading
                    ? 'bg-indigo-700 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl'
              }`}
              disabled={isSubscribed || isLoading}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : isSubscribed ? (
                'Subscribed!'
              ) : (
                'Subscribe Now'
              )}
            </motion.button>
          </motion.form>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-indigo-300 text-sm text-center mt-4"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
        
        {/* Benefits grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              ),
              title: "Exclusive Deals",
              description: "Special discounts only for subscribers"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Early Access",
              description: "Be the first to know about new products"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              ),
              title: "Valuable Content",
              description: "Industry insights and expert tips"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-3 bg-white/10 rounded-lg"
                  animate={{ 
                    rotate: isHovered ? [0, 10, -10, 5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-indigo-200">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4"
        animate={{ 
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Exclusive Content
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4"
        animate={{ 
          rotate: [0, -5, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Special Offers
        </div>
      </motion.div>
      
      {/* Animated envelope */}
      {!isSubscribed && (
        <motion.div
          className="absolute top-1/3 right-10 hidden lg:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-12"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Newsletter;