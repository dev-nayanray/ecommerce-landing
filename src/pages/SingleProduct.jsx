import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getProductById, 
  getProductReviews 
} from '../api/wordpressAPI';

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productResponse = await getProductById(id);
        const productData = transformProduct(productResponse.data);
        setProduct(productData);
        
        // Set default selections
        if (productData.colors.length > 0) {
          setSelectedColor(productData.colors[0].name);
        }
        if (productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        
        // Fetch product reviews
        const reviewsResponse = await getProductReviews(id);
        setReviews(transformReviews(reviewsResponse.data));
        
      } catch (err) {
        console.error('Product fetch error:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!showZoom || !product) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform WooCommerce product data to match our structure
  const transformProduct = (wcProduct) => {
    // Extract color attributes
    const colorAttribute = wcProduct.attributes.find(
      attr => attr.name.toLowerCase() === 'color' || attr.id === 1
    );
    
    const colors = colorAttribute 
      ? colorAttribute.options.map(color => ({
          name: color.toLowerCase(),
          hex: getColorHex(color)
        }))
      : [
          { name: "black", hex: "#1F2937" },
          { name: "silver", hex: "#E5E7EB" }
        ];

    // Extract size attributes
    const sizeAttribute = wcProduct.attributes.find(
      attr => attr.name.toLowerCase() === 'size' || attr.id === 2
    );
    
    const sizes = sizeAttribute 
      ? sizeAttribute.options.map(size => size.toLowerCase()) 
      : ["small", "medium", "large"];
    
    return {
      id: wcProduct.id,
      title: wcProduct.name,
      price: parseFloat(wcProduct.regular_price),
      discountPrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : parseFloat(wcProduct.regular_price),
      description: wcProduct.short_description || wcProduct.description,
      images: wcProduct.images.map(img => img.src),
      details: wcProduct.description,
      specifications: [
        { label: "SKU", value: wcProduct.sku || 'N/A' },
        { label: "Weight", value: wcProduct.weight ? `${wcProduct.weight} ${wcProduct.weight_unit}` : 'N/A' },
        { label: "Dimensions", value: wcProduct.dimensions ? `${wcProduct.dimensions.length}x${wcProduct.dimensions.width}x${wcProduct.dimensions.height} ${wcProduct.dimensions.unit}` : 'N/A' },
        { label: "Stock Status", value: wcProduct.stock_status === 'instock' ? 'In Stock' : 'Out of Stock' },
        { label: "Categories", value: wcProduct.categories.map(cat => cat.name).join(', ') }
      ],
      highlights: [
        { icon: "🔇", text: "Premium Quality" },
        { icon: "🔋", text: "Long Lasting" },
        { icon: "🎧", text: "Comfortable Design" },
        { icon: "🌐", text: "Wide Compatibility" }
      ],
      colors,
      sizes,
      reviews: [] // Will be populated separately
    };
  };

  // Transform WooCommerce reviews
  const transformReviews = (wcReviews) => {
    return wcReviews.map(review => ({
      name: review.reviewer,
      rating: parseInt(review.rating),
      date: new Date(review.date_created).toISOString().split('T')[0],
      comment: review.review
    }));
  };

  // Helper to get color hex values
  const getColorHex = (colorName) => {
    const colorMap = {
      black: "#1F2937",
      silver: "#E5E7EB",
      white: "#FFFFFF",
      red: "#EF4444",
      blue: "#3B82F6",
      green: "#10B981",
      yellow: "#F59E0B",
      purple: "#8B5CF6",
      pink: "#EC4899",
      brown: "#78350F"
    };
    
    return colorMap[colorName.toLowerCase()] || "#1F2937";
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 4.5; // Default if no reviews

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{error || 'Product not found'}</h2>
          <p className="text-gray-600 mt-2">We couldn't load the requested product. Please try again later.</p>
          <button 
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <Link 
            to="/products" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            &larr; Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Render product details
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Sticky header */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 transform ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center justify-between">
          <div className="flex items-center">
            {product.images.length > 0 && (
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-16 h-16 object-contain rounded-xl mr-4"
              />
            )}
            <div>
              <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'fill-current' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({reviews.length})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {product.price !== product.discountPrice && (
              <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
            )}
            <span className="text-indigo-600 font-bold text-xl ml-2">${product.discountPrice.toFixed(2)}</span>
            <button className="ml-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-24 pb-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Product header */}
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="bg-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  TOP RATED
                </div>
                <h1 className="text-3xl font-bold text-white">{product.title}</h1>
              </div>
              <div className="text-right">
                {product.price !== product.discountPrice && (
                  <span className="text-gray-300 line-through text-lg">${product.price.toFixed(2)}</span>
                )}
                <div className="flex items-baseline">
                  <span className="text-white font-bold text-4xl">${product.discountPrice.toFixed(2)}</span>
                  {product.price !== product.discountPrice && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
                      SAVE {Math.round((1 - product.discountPrice / product.price) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Image gallery */}
            <div className="lg:w-1/2 p-8">
              {product.images.length > 0 ? (
                <>
                  <div 
                    className="relative rounded-2xl overflow-hidden mb-6 cursor-zoom-in"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img 
                      src={product.images[selectedImage]} 
                      alt={product.title} 
                      className="w-full h-auto object-contain rounded-2xl"
                      style={{ height: '500px' }}
                    />
                    
                    {showZoom && (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `url(${product.images[selectedImage]})`,
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundSize: '200%',
                          opacity: 0.2,
                          filter: 'blur(10px)'
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    {product.images.map((img, index) => (
                      <div 
                        key={index}
                        className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                          selectedImage === index ? 'border-indigo-600 scale-105' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedImage(index)}
                        style={{ width: '80px', height: '80px' }}
                      >
                        <img 
                          src={img}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-b from-indigo-50 to-white">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-current' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
                
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.highlights.slice(0, 4).map((highlight, index) => (
                    <div key={index} className="flex items-center bg-white p-3 rounded-xl shadow-sm">
                      <span className="text-2xl mr-2">{highlight.icon}</span>
                      <span className="text-gray-700 font-medium">{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === color.name 
                            ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110' 
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.name)}
                      >
                        {selectedColor === color.name && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size selector */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size 
                            ? 'border-indigo-600 bg-indigo-600 text-white' 
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
              
              {/* Additional features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-50 p-3 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">30-Day Returns</span>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-gray-700">3-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for details, specs, and reviews */}
          <div className="px-8 py-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 font-medium text-lg ${
                  activeTab === 'description' 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 font-medium text-lg ${
                  activeTab === 'specs' 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button
                className={`px-4 py-2 font-medium text-lg ${
                  activeTab === 'reviews' 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </div>
            
            {/* Tab content */}
            <div className="py-4">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: product.details }} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {product.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-2xl mr-3 mt-1">{highlight.icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-800">{highlight.text}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="text-center md:text-left mb-4 md:mb-0 md:mr-8">
                        <div className="text-5xl font-bold text-indigo-700">{averageRating.toFixed(1)}</div>
                        <div className="flex justify-center md:justify-start text-yellow-400 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${i < Math.floor(averageRating) ? 'fill-current' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-gray-600 mt-1">Based on {reviews.length} reviews</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Share your experience</h3>
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                          Write a Review
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                              <div>
                                <h4 className="font-bold text-gray-800">{review.name}</h4>
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-700 mt-4">No reviews yet</h3>
                        <p className="text-gray-500 mt-2">Be the first to review this product!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating action bar for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center">
        <div>
          <div className="text-indigo-600 font-bold text-xl">${product.discountPrice.toFixed(2)}</div>
          {product.price !== product.discountPrice && (
            <div className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</div>
          )}
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}