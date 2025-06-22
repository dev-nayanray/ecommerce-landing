import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Cart() {
  // Demo cart items state
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Wireless Bluetooth Headphones', 
      price: 129.99, 
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      color: 'Black',
      size: 'Standard'
    },
    { 
      id: 2, 
      name: 'Smart Fitness Watch Pro', 
      price: 199.99, 
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      color: 'Midnight Blue',
      size: 'Medium'
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuantityChange = (id, qty) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemove = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim() === '') return;
    
    setIsApplying(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAVE15') {
        setDiscount(0.15);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsApplying(false);
    }, 1000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const totalPrice = subtotal - discountAmount;
  const shipping = totalPrice > 0 ? 9.99 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Shopping Cart
          </span>
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length} Item{cartItems.length > 1 ? 's' : ''} in Cart
                  </h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <motion.li 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <div className="bg-gray-200 rounded-xl w-24 h-24 flex items-center justify-center overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                              <div className="flex mt-2 space-x-4">
                                <div className="flex items-center">
                                  <span className="text-gray-600 mr-2">Color:</span>
                                  <span className="font-medium">{item.color}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-gray-600 mr-2">Size:</span>
                                  <span className="font-medium">{item.size}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-lg font-bold text-indigo-600">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex flex-wrap justify-between items-center mt-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 mx-2 border border-gray-300 rounded-lg px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              />
                              
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="flex items-center text-red-600 hover:text-red-800 mt-4 sm:mt-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-grow border border-gray-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={isApplying}
                      className={`px-6 py-3 rounded-r-xl font-bold ${
                        isApplying 
                          ? 'bg-gray-400' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      } text-white transition-all`}
                    >
                      {isApplying ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  
                  {isSuccess && (
                    <motion.div 
                      className="mt-4 text-green-600 font-medium flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Promo code applied! 15% discount added.
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Continue Shopping
                </button>
                
                <button className="px-6 py-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Cart
                </button>
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div>
              <motion.div 
                className="bg-white rounded-3xl shadow-xl p-6 sticky top-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${(totalPrice + shipping).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center cursor-pointer hover:border-indigo-400">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                    </div>
                    <div className="border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center cursor-pointer hover:border-indigo-400">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                    </div>
                    <div className="border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center cursor-pointer hover:border-indigo-400">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM8 7a1 1 0 011 1v1a1 1 0 11-2 0V8a1 1 0 011-1zm4 0a1 1 0 011 1v1a1 1 0 11-2 0V8a1 1 0 011-1zm-4 4a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zm4 0a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Secure Payment
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-bold text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our customer service team is available 24/7 to assist with your order.
                </p>
                <div className="flex items-center text-indigo-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (800) 123-4567
                </div>
                <div className="flex items-center text-indigo-600 font-medium mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@example.com
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}