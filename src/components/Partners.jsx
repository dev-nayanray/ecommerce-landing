import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  const partners = [
    { id: 1, name: "TechVision", logo: "https://placehold.co/200x80?text=TechVision&font=roboto" },
    { id: 2, name: "StyleHub", logo: "https://placehold.co/200x80?text=StyleHub&font=roboto" },
    { id: 3, name: "HomeEssentials", logo: "https://placehold.co/200x80?text=HomeEssentials&font=roboto" },
    { id: 4, name: "ElectraPro", logo: "https://placehold.co/200x80?text=ElectraPro&font=roboto" },
    { id: 5, name: "GadgetFlow", logo: "https://placehold.co/200x80?text=GadgetFlow&font=roboto" },
    { id: 6, name: "UrbanStyle", logo: "https://placehold.co/200x80?text=UrbanStyle&font=roboto" },
    { id: 7, name: "EcoLiving", logo: "https://placehold.co/200x80?text=EcoLiving&font=roboto" },
    { id: 8, name: "InnovateX", logo: "https://placehold.co/200x80?text=InnovateX&font=roboto" },
  ];

  // Calculate the actual width for seamless looping
  const [itemWidth, setItemWidth] = useState(240);
  const duplicatedPartners = [...partners, ...partners];
  const marqueeWidth = itemWidth * partners.length;
  
  const [isPaused, setIsPaused] = useState(false);

  // Handle responsive width
  useEffect(() => {
    const calcWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) setItemWidth(180);
      else if (screenWidth < 1024) setItemWidth(200);
      else setItemWidth(240);
    };
    
    calcWidth();
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            TRUSTED PARTNERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Brands That Trust Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders to bring you the best products and services
          </p>
        </div>
        
        {/* Marquee container */}
        <div 
          className="relative py-8 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top marquee */}
          <motion.div 
            className="flex mb-10"
            animate={{ 
              x: [0, -marqueeWidth],
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              paused: isPaused
            }}
          >
            {duplicatedPartners.map((partner) => (
              <div 
                key={`top-${partner.id}`} 
                className="flex-shrink-0 px-6 opacity-80 hover:opacity-100 transition-opacity"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md h-32 flex items-center justify-center border border-gray-100">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Bottom marquee (reverse direction) */}
          <motion.div 
            className="flex"
            animate={{ 
              x: [-marqueeWidth, 0],
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              paused: isPaused
            }}
          >
            {duplicatedPartners.map((partner) => (
              <div 
                key={`bottom-${partner.id}`} 
                className="flex-shrink-0 px-6 opacity-80 hover:opacity-100 transition-opacity"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md h-32 flex items-center justify-center border border-gray-100">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Want to become a partner?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              Partner With Us
            </button>
            <button className="px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
              View Benefits
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4 z-0"
        animate={{ 
          rotate: [0, 10, 0],
          y: [0, -15, 0]
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
        className="absolute bottom-1/4 right-1/4 z-0"
        animate={{ 
          rotate: [0, -8, 0],
          y: [0, 15, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Premium Brands
        </div>
      </motion.div>
    </section>
  );
};

export default Partners;