import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: right, 1: left
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      rating: 5,
      content: "The quality of products here is exceptional! I've been shopping for years and this is by far the best online experience. Fast shipping and excellent customer service.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Enthusiast",
      rating: 4,
      content: "Their electronics selection is unmatched. Got the latest gadget at a competitive price. The product arrived earlier than expected and was perfectly packaged.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Home Decor Expert",
      rating: 5,
      content: "Transformed my living space with their beautiful home collection. The quality exceeded my expectations. Will definitely be purchasing again soon!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Fitness Coach",
      rating: 5,
      content: "As a fitness professional, I'm picky about equipment. Their gear is top-notch and durable. The customer support team helped me choose the perfect items for my home gym.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Beauty Influencer",
      rating: 4,
      content: "Their beauty products are authentic and fresh. Love the organic options and cruelty-free brands. Packaging is always secure and delivery is lightning fast!",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setDirection(0);
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 0 : 1);
    setCurrentIndex(index);
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
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            CUSTOMER STORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their shopping experience
          </p>
        </div>
        
        {/* Testimonials carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                variants={slideVariants}
                initial={direction === 0 ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-8">
                  {/* Profile image */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="relative">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full font-bold text-sm">
                        ★ {testimonials[currentIndex].rating}.0
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 ${i < testimonials[currentIndex].rating ? 'text-amber-400' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-6">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-indigo-600">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <button 
              onClick={goToPrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">98%</div>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">24h</div>
            <p className="text-gray-600">Avg. Delivery Time</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">10K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to join our happy customers?</h3>
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Start Shopping Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;