import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function HeroSlider() {
const slides = [
            {
                id: 1,
                title: "Summer Collection",
                subtitle: "New Arrivals",
                description: "Discover our fresh summer lineup with exclusive designs",
                buttonText: "Shop Now",
                buttonLink: "#summer-collection",
                bgColor: "from-blue-600 to-indigo-700",
                textColor: "text-white",
                accentColor: "bg-blue-500",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            },
            {
                id: 2,
                title: "Tech Deals",
                subtitle: "Up to 40% Off",
                description: "Cutting-edge gadgets at unbeatable prices",
                buttonText: "View Deals",
                buttonLink: "#tech-deals",
                bgColor: "from-purple-700 to-indigo-800",
                textColor: "text-white",
                accentColor: "bg-purple-500",
                image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            },
            {
                id: 3,
                title: "Home Essentials",
                subtitle: "Limited Time Offer",
                description: "Redefine your living space with premium home goods",
                buttonText: "Explore",
                buttonLink: "#home-essentials",
                bgColor: "from-amber-600 to-orange-500",
                textColor: "text-white",
                accentColor: "bg-amber-500",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            },
            {
                id: 4,
                title: "Premium Accessories",
                subtitle: "New Collection",
                description: "Elevate your style with our designer accessories",
                buttonText: "Discover",
                buttonLink: "#accessories",
                bgColor: "from-emerald-700 to-teal-600",
                textColor: "text-white",
                accentColor: "bg-emerald-500",
                image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            }
        ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const progressRef = useRef(null);

  // Auto-rotate slides
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSlide, autoPlay]);

  const goToNextSlide = useCallback(() => {
    setDirection(0);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden rounded-2xl shadow-2xl">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            variants={slideVariants}
            initial={direction === 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background image with gradient overlay */}
            <div className="absolute inset-0">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor} bg-opacity-90`} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <motion.span 
                  className="text-lg md:text-xl font-semibold text-white bg-black/20 px-4 py-1 rounded-full inline-block mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.span>
                <motion.h1 
                  className={`text-4xl md:text-6xl font-bold ${slides[currentSlide].textColor} mb-6`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  className={`text-lg md:text-xl ${slides[currentSlide].textColor} mb-8 max-w-lg`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <a
                    href={slides[currentSlide].buttonLink}
                    className="inline-block bg-white text-gray-900 px-8 py-3.5 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
                  >
                    {slides[currentSlide].buttonText}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation with circular progress */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-6">
        <button 
          onClick={goToPrevSlide}
          className="relative w-14 h-14 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Circular progress */}
        <button 
          onClick={toggleAutoPlay}
          className="relative w-16 h-16 flex items-center justify-center"
          aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
        >
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="4" 
            />
            <motion.circle 
              ref={progressRef}
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              strokeDasharray="283"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {autoPlay ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>

        <button 
          onClick={goToNextSlide}
          className="relative w-14 h-14 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators with preview */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? `${slides[currentSlide].accentColor} scale-150` 
                : 'bg-white/50'
            }`} />
            
            {/* Preview tooltip */}
            <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-3 hidden group-hover:block w-40 p-2 bg-black/80 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <span className="text-xs text-white font-medium truncate w-full text-center">
                  {slide.title}
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black/80" />
            </div>
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-10 bg-black/30 text-white px-3 py-1.5 rounded-full text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Floating elements */}
      <motion.div 
        className="absolute top-16 left-16 z-1"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <div className="text-white font-bold text-sm">50% OFF</div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-24 right-24 z-1"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <div className="text-white font-bold text-sm">Free Shipping</div>
        </div>
      </motion.div>
    </div>
  );
}