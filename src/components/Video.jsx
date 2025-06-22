import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openModal = () => {
    setShowModal(true);
    if (!isPlaying) {
      togglePlay();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (isPlaying) {
      togglePlay();
    }
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-900 to-black">
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-900 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-900 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
            OUR STORY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience Our Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the passion and craftsmanship behind our products
          </p>
        </div>
        
        {/* Video container */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Video element */}
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675&q=80"
              muted
              loop
            >
              <source src="https://assets.codepen.io/3364143/screen.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            {/* Play button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </motion.button>
            
            {/* Expand button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="absolute bottom-6 right-6 bg-black/50 text-white p-3 rounded-full backdrop-blur-sm border border-white/20"
              aria-label="Expand video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </motion.button>
            
            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 text-left">
              <h3 className="text-xl font-bold text-white">Our Craftsmanship Journey</h3>
              <p className="text-gray-300 text-sm">5 min video</p>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-700/50 p-6 rounded-xl border border-indigo-500/30 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">10M+</div>
            <p className="text-indigo-200">Products Delivered</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-700/50 p-6 rounded-xl border border-purple-500/30 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <p className="text-purple-200">Countries Served</p>
          </div>
          <div className="bg-gradient-to-br from-pink-900/50 to-pink-700/50 p-6 rounded-xl border border-pink-500/30 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <p className="text-pink-200">Customer Satisfaction</p>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                controls
              >
                <source src="https://assets.codepen.io/3364143/screen.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Premium Quality
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4"
        animate={{ 
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Crafted with Care
        </div>
      </motion.div>
    </section>
  );
};

export default Video;