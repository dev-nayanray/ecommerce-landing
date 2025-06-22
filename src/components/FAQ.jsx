import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Most orders are processed within 1-2 business days and shipped via standard delivery which takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery.",
      category: "Shipping"
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. Items must be unused, in their original packaging with tags attached. Return shipping is free for customers in the continental US.",
      category: "Returns"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package directly through our website or the carrier's website using this number.",
      category: "Orders"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary based on destination. Duties and taxes may apply depending on your country's regulations.",
      category: "Shipping"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely encrypted.",
      category: "Payments"
    },
    {
      question: "How do I contact customer support?",
      answer: "Our support team is available 24/7 via live chat on our website. You can also email us at support@example.com or call +1 (800) 123-4567 during business hours (9am-9pm EST).",
      category: "Support"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Group by category
  const faqByCategory = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            HELP CENTER
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about orders, shipping, returns, and more
          </p>
        </div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(faqByCategory).map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === category 
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveIndex(activeIndex === category ? null : category)}
            >
              {category}
            </button>
          ))}
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeIndex === 'all' 
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveIndex(activeIndex === 'all' ? null : 'all')}
          >
            View All
          </button>
        </div>
        
        {/* FAQ grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Object.entries(faqByCategory).map(([category, items]) => (
            <div 
              key={category} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                activeIndex !== null && activeIndex !== 'all' && activeIndex !== category ? 'opacity-50' : ''
              }`}
            >
              <div className="bg-indigo-50 p-4 border-b border-indigo-100">
                <h3 className="text-lg font-bold text-indigo-700">{category}</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-5 cursor-pointer"
                    onClick={() => toggleFAQ(`${category}-${index}`)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800">{item.question}</h4>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-indigo-600 transition-transform duration-300 ${
                          activeIndex === `${category}-${index}` ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <AnimatePresence>
                      {activeIndex === `${category}-${index}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-gray-600">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Support CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 p-8 md:p-12">
              <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
                NEED HELP?
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                We're here to assist you
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is ready to help with any questions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
                  Contact Support
                </button>
                <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
            
            <div className="md:col-span-3 bg-gradient-to-br from-indigo-500 to-purple-500 h-full min-h-[300px] relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-white font-bold text-lg mb-2">24/7 Support</div>
                    <div className="text-indigo-100">Always available to help</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-white font-bold text-lg mb-2">Quick Response</div>
                    <div className="text-indigo-100">Avg. response time: 5 min</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;