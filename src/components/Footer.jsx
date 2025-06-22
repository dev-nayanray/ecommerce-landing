import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold ml-2">ElectroShop</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Premium e-commerce experience with the latest products and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                <motion.a 
                  key={social}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 hover:bg-indigo-600 transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                  aria-label={social}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-indigo-600">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'Categories', 'New Arrivals', 'Deals', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-indigo-600">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Exchanges', 'Privacy Policy', 'Terms & Conditions', 'Track Order'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-indigo-600">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none rounded-l-lg"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 rounded-r-lg hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <div className="text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <h3 className="text-center text-gray-400 mb-4">We Accept</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-3 rounded-lg"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} ElectroShop. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating back to top */}
      <motion.a 
        href="#top"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.a>
    </footer>
  );
}