import axios from 'axios';

const WP_BASE_URL = 'https://rainshieldbd.mollasonsgroup.com/wp-json/wp/v2';
const WC_BASE_URL = 'https://rainshieldbd.mollasonsgroup.com/wp-json/wc/v3';

// WooCommerce API credentials
const WC_CONSUMER_KEY = 'ck_104eb7b7df22c8062c170860a2b06ac4eb1d129d';
const WC_CONSUMER_SECRET = 'cs_777a0fc0b23f65d7f1611c74d1352000eabb6141';

// WooCommerce API configuration
const wcConfig = {
  params: {
    consumer_key: WC_CONSUMER_KEY,
    consumer_secret: WC_CONSUMER_SECRET,
    per_page: 100
  }
};

// WordPress API functions
export const getPosts = () => axios.get(`${WP_BASE_URL}/posts`);
export const getCategories = () => axios.get(`${WP_BASE_URL}/categories`);
export const getCurrentUser = () => axios.get(`${WP_BASE_URL}/users/me`, wcConfig);
export const updateUser = (id, data) => axios.post(`${WP_BASE_URL}/users/${id}`, data, wcConfig);
export const registerUser = (data) => axios.post(`${WP_BASE_URL}/users/register`, data);
export const loginUser = (data) => axios.post(`${WP_BASE_URL}/jwt-auth/v1/token`, data);

// Add these blog-related API functions
export const getBlogPosts = () => axios.get(`${WP_BASE_URL}/posts?_embed`, wcConfig);
export const getPostById = (id) => axios.get(`${WP_BASE_URL}/posts/${id}?_embed`, wcConfig);
export const getPostCategories = () => axios.get(`${WP_BASE_URL}/categories`, wcConfig);
export const getPostsByCategory = (categoryId) => axios.get(`${WP_BASE_URL}/posts?categories=${categoryId}&_embed`, wcConfig);

// WooCommerce API functions
export const getProducts = () => axios.get(`${WC_BASE_URL}/products`, wcConfig);
export const getProductById = (id) => axios.get(`${WC_BASE_URL}/products/${id}`, wcConfig);
export const getProductReviews = (productId) => axios.get(`${WC_BASE_URL}/products/reviews?product=${productId}`, wcConfig);
export const getProductCategories = () => axios.get(`${WC_BASE_URL}/products/categories`, wcConfig);

// Cart API functions (Note: WooCommerce doesn't have native cart API, 
// so we'll manage client-side and use these for order creation)
export const addToCart = (productId, quantity) => {
  // This would be client-side implementation
  // For server-side, you'd need a custom endpoint
  return Promise.resolve({ success: true });
};

export const getCart = () => {
  // Client-side implementation
  return Promise.resolve({ items: [] });
};

// Checkout and Orders API functions
export const createOrder = (orderData) => axios.post(`${WC_BASE_URL}/orders`, orderData, wcConfig);
export const getOrders = (customerId) => axios.get(`${WC_BASE_URL}/orders?customer=${customerId}`, wcConfig);
export const getOrderById = (orderId) => axios.get(`${WC_BASE_URL}/orders/${orderId}`, wcConfig);
export const updateOrder = (orderId, data) => axios.put(`${WC_BASE_URL}/orders/${orderId}`, data, wcConfig);

// Payment Gateway API functions
export const createPaymentIntent = (data) => {
  // Example for Stripe - you'll need to implement your payment gateway
  return axios.post('/api/create-payment-intent', data);
};

// Shipping API functions
export const getShippingMethods = () => axios.get(`${WC_BASE_URL}/shipping_methods`, wcConfig);
export const getShippingZones = () => axios.get(`${WC_BASE_URL}/shipping/zones`, wcConfig);

// Coupon API functions
export const validateCoupon = (code) => axios.get(`${WC_BASE_URL}/coupons?code=${code}`, wcConfig);

// Customer API functions
export const getCustomer = (id) => axios.get(`${WC_BASE_URL}/customers/${id}`, wcConfig);
export const updateCustomer = (id, data) => axios.put(`${WC_BASE_URL}/customers/${id}`, data, wcConfig);
export const createCustomer = (data) => axios.post(`${WC_BASE_URL}/customers`, data, wcConfig);