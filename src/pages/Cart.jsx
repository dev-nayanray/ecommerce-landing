import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  getProductById,
  validateCoupon,
  createOrder,
  getShippingMethods
} from '../api/wordpressAPI';

export default function Cart() {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [couponDetails, setCouponDetails] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Load cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Enrich cart items with product details from API
        const enrichedCart = await Promise.all(
          savedCart.map(async (item) => {
            try {
              const product = await getProductById(item.id);
              return {
                ...item,
                name: product.data.name,
                price: parseFloat(product.data.price),
                image: product.data.images[0]?.src || '/images/placeholder.jpg',
                stock_status: product.data.stock_status,
                sku: product.data.sku || 'N/A'
              };
            } catch (err) {
              console.error(`Error fetching product ${item.id}:`, err);
              return item; // Return the item without enrichment if API fails
            }
          })
        );
        
        setCartItems(enrichedCart);
        
        // Fetch shipping methods
        const shippingResponse = await getShippingMethods();
        setShippingMethods(shippingResponse.data);
        if (shippingResponse.data.length > 0) {
          setSelectedShipping(shippingResponse.data[0]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing cart:', err);
        setError('Failed to load cart data');
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      // Save only necessary data to localStorage
      const simplifiedCart = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      }));
      localStorage.setItem('cart', JSON.stringify(simplifiedCart));
    }
  }, [cartItems]);

  const handleQuantityChange = (id, qty) => {
    setCartItems(items =>
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const handleRemove = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    
    if (newCart.length === 0) {
      localStorage.removeItem('cart');
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplying(true);
    setIsSuccess(false);
    setCouponDetails(null);
    
    try {
      const response = await validateCoupon(promoCode);
      if (response.data.length > 0) {
        const coupon = response.data[0];
        setCouponDetails({
          code: coupon.code,
          description: coupon.description,
          discount_type: coupon.discount_type,
          amount: coupon.amount
        });
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setIsSuccess(false);
    } finally {
      setIsApplying(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    
    const discountAmount = couponDetails 
      ? couponDetails.discount_type === 'percent' 
        ? subtotal * (parseFloat(couponDetails.amount) / 100)
        : parseFloat(couponDetails.amount)
      : 0;
    
    const shippingCost = selectedShipping ? 5.99 : 0; // Simplified shipping cost
    const totalPrice = subtotal - discountAmount + shippingCost;
    
    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      shipping: shippingCost.toFixed(2),
      total: totalPrice.toFixed(2)
    };
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    // Prepare order data
    const totals = calculateTotals();
    const orderData = {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      status: 'pending',
      line_items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shipping_lines: selectedShipping ? [{
        method_id: selectedShipping.id,
        method_title: selectedShipping.title,
        total: totals.shipping
      }] : [],
      coupon_lines: couponDetails ? [{
        code: couponDetails.code,
        discount: totals.discount
      }] : [],
      total: totals.total,
      customer_note: 'Order placed from website'
    };
    
    try {
      const response = await createOrder(orderData);
      console.log('Order created:', response.data);
      
      // Clear cart after successful order
      setCartItems([]);
      localStorage.removeItem('cart');
      
      // Redirect to order confirmation page
      window.location.href = `/order-confirmation/${response.data.id}`;
    } catch (err) {
      console.error('Order creation error:', err);
      setError('Failed to create order. Please try again.');
    }
  };

  // Renamed variables to avoid conflict
  const { subtotal: cartSubtotal, discount: cartDiscount, shipping: cartShipping, total: cartTotal } = calculateTotals();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mt-4">Error Loading Cart</h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <Link 
            to="/" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

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
            <Link 
              to="/products" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Continue Shopping
            </Link>
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
                          <div className="rounded-xl w-24 h-24 flex items-center justify-center overflow-hidden border">
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
                                  <span className="text-gray-600 mr-2">SKU:</span>
                                  <span className="font-medium">{item.sku}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-gray-600 mr-2">Status:</span>
                                  <span className={`font-medium ${
                                    item.stock_status === 'instock' 
                                      ? 'text-green-600' 
                                      : 'text-red-600'
                                  }`}>
                                    {item.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-lg font-bold text-indigo-600">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex flex-wrap justify-between items-center mt-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
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
                  
                  {isSuccess && couponDetails && (
                    <motion.div 
                      className="mt-4 p-3 bg-green-50 rounded-lg text-green-700 font-medium flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {couponDetails.description || `Coupon applied! Discount: ${couponDetails.amount}${couponDetails.discount_type === 'percent' ? '%' : '$'}`}
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
                <Link 
                  to="/products" 
                  className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={() => {
                    // Implement cart update if needed
                  }}
                  className="px-6 py-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
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
                    <span className="font-medium">${cartSubtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${cartShipping}</span>
                  </div>
                  
                  {parseFloat(cartDiscount) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-${cartDiscount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedShipping?.id === method.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-400'
                        }`}
                        onClick={() => setSelectedShipping(method)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{method.title}</h4>
                            <p className="text-sm text-gray-600">${method.settings.cost.value} - {method.settings.delivery_time.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
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