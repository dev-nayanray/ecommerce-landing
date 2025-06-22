import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const UserCounts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const stats = [
    { id: 1, value: 250, suffix: "K+", label: "Happy Customers", icon: "😊" },
    { id: 2, value: 500, suffix: "K+", label: "Orders Delivered", icon: "🚚" },
    { id: 3, value: 100, suffix: "K+", label: "Products Sold", icon: "🛒" },
    { id: 4, value: 98, suffix: "%", label: "Satisfaction Rate", icon: "⭐" }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const countVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: { 
        duration: 1.5,
        delay: 0.3 + custom * 0.2
      }
    })
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            OUR IMPACT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our growing community of satisfied customers and experience the difference
          </p>
        </div>
        
        {/* Stats grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl mb-4 mx-auto">
                {stat.icon}
              </div>
              
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900"
                custom={index}
                variants={countVariants}
                initial="hidden"
                animate={controls}
              >
                {stat.value}
                <span className="text-indigo-600">{stat.suffix}</span>
              </motion.div>
              
              <p className="text-gray-600 text-center">{stat.label}</p>
              
              {/* Animated progress bar */}
              <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={controls}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                  style={{ width: `${Math.min(100, (stat.value / (stat.id === 4 ? 100 : 500)) * 100)}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated user avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 1.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex -space-x-3">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xl">
                  {["😊", "😄", "😍", "🤩", "👏", "👍", "🙌", "💯", "🎉", "🔥", "🚀", "⭐"][i]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 1.8 }}
          className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100 relative"
        >
          <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-gray-100">
            REAL TESTIMONIAL
          </div>
          <p className="text-gray-700 italic mb-4">
            "This is hands down the best shopping experience I've had online. Fast shipping, quality products, and exceptional customer service!"
          </p>
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div className="ml-3">
              <div className="font-medium text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Verified Customer</div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Join Our Community
          </button>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4"
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
          Trusted Worldwide
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Premium Quality
        </div>
      </motion.div>
    </section>
  );
};

export default UserCounts;