import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const megaMenuRef = useRef(null);
  const cartRef = useRef(null);
  const accountRef = useRef(null);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mega menus
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
      }
      
      // Close cart
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      
      // Close account dropdown
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', to: '/' },
    { 
      name: 'Shop', 
      to: '/shop',
      megaMenu: {
        title: 'Shop by Category',
        columns: [
          {
            title: 'Electronics',
            items: [
              { name: 'Smartphones', to: '/category/smartphones' },
              { name: 'Laptops & Computers', to: '/category/laptops' },
              { name: 'TVs & Home Theater', to: '/category/tvs' },
              { name: 'Cameras & Photography', to: '/category/cameras' },
              { name: 'Audio & Headphones', to: '/category/audio' },
            ]
          },
          {
            title: 'Home & Kitchen',
            items: [
              { name: 'Kitchen Appliances', to: '/category/kitchen-appliances' },
              { name: 'Home Decor', to: '/category/home-decor' },
              { name: 'Furniture', to: '/category/furniture' },
              { name: 'Lighting', to: '/category/lighting' },
              { name: 'Smart Home', to: '/category/smart-home' },
            ]
          },
          {
            title: 'Featured',
            items: [
              { name: 'New Arrivals', to: '/new-arrivals' },
              { name: 'Best Sellers', to: '/best-sellers' },
              { name: 'Deals of the Day', to: '/deals' },
              { name: 'Clearance', to: '/clearance' },
              { name: 'Gift Cards', to: '/gift-cards' },
            ]
          }
        ],
        featured: {
          title: 'Summer Sale',
          description: 'Up to 50% off on electronics',
          image: 'https://via.placeholder.com/300x200?text=Summer+Sale',
          to: '/summer-sale'
        }
      }
    },
    { 
      name: 'Categories', 
      to: '/categories',
      megaMenu: {
        title: 'Browse All Categories',
        columns: [
          {
            title: 'Tech',
            items: [
              { name: 'Computers & Tablets', to: '/category/computers' },
              { name: 'Wearable Technology', to: '/category/wearables' },
              { name: 'Gaming', to: '/category/gaming' },
              { name: 'Drones & Accessories', to: '/category/drones' },
              { name: 'Virtual Reality', to: '/category/vr' },
            ]
          },
          {
            title: 'Home & Lifestyle',
            items: [
              { name: 'Kitchen & Dining', to: '/category/kitchen' },
              { name: 'Bed & Bath', to: '/category/bed-bath' },
              { name: 'Furniture', to: '/category/furniture' },
              { name: 'Home Improvement', to: '/category/home-improvement' },
              { name: 'Garden & Outdoor', to: '/category/garden' },
            ]
          },
          {
            title: 'Health & Beauty',
            items: [
              { name: 'Skincare', to: '/category/skincare' },
              { name: 'Hair Care', to: '/category/hair-care' },
              { name: 'Makeup', to: '/category/makeup' },
              { name: 'Fragrance', to: '/category/fragrance' },
              { name: 'Personal Care', to: '/category/personal-care' },
            ]
          }
        ],
        featured: {
          title: 'New Arrivals',
          description: 'Check out our latest products',
          image: 'https://via.placeholder.com/300x200?text=New+Arrivals',
          to: '/new-arrivals'
        }
      }
    },
    { 
      name: 'Pages', 
      to: '/pages',
      dropdown: [
        { name: 'About Us', to: '/about-us' },
        { name: 'Contact', to: '/contact' },
        { name: 'FAQs', to: '/faqs' },
        { name: 'Terms & Privacy', to: '/terms-privacy' },
        { name: 'Return Policy', to: '/return-policy' },
      ]
    },
     
    { name: 'Cart', to: '/cart' },
    { name: 'Checkout', to: '/checkout' },
  ];

  // TODO: Replace demo cart items with dynamic cart state from context or API
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch or subscribe to cart state here
    // For demo, using static items
    setCartItems([
      { id: 1, name: 'Wireless Bluetooth Headphones', price: 129.99, quantity: 1 },
      { id: 2, name: 'Smart Fitness Watch Pro', price: 199.99, quantity: 2 },
    ]);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Toggle mega menu
  const toggleMegaMenu = (menuName) => {
    if (activeMegaMenu === menuName) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menuName);
      setActiveDropdown(null);
      setIsCartOpen(false);
      setIsAccountOpen(false);
    }
  };

  // Toggle dropdown
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
      setActiveMegaMenu(null);
      setIsCartOpen(false);
      setIsAccountOpen(false);
    }
  };

  // Close all menus
  const closeAllMenus = () => {
    setActiveMegaMenu(null);
    setActiveDropdown(null);
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-600 to-indigo-700 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1.5 rounded-lg">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-8 h-8 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-700' : 'text-white'}`}>ElectroShop</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 relative" ref={megaMenuRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.megaMenu ? (
                  <div className="relative">
                    <button
                      className={`font-medium px-4 py-2 rounded-lg transition-colors flex items-center ${
                        isScrolled 
                          ? (activeMegaMenu === item.name ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')
                          : (activeMegaMenu === item.name ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-800')
                      }`}
                      onClick={() => toggleMegaMenu(item.name)}
                      aria-expanded={activeMegaMenu === item.name}
                    >
                      {item.name}
                      <svg 
                        className={`ml-1 w-4 h-4 transition-transform ${
                          activeMegaMenu === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mega Menu */}
                    {activeMegaMenu === item.name && (
                      <div className="absolute left-0 w-[800px] bg-white shadow-2xl rounded-xl border border-gray-200 p-6 z-50 animate-fadeIn mt-1">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900">{item.megaMenu.title}</h3>
                          <Link 
                            to={item.to} 
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                            onClick={closeAllMenus}
                          >
                            View All →
                          </Link>
                        </div>
                        
                        <div className="flex">
                          {/* Columns */}
                          <div className="flex-1 grid grid-cols-3 gap-8">
                            {item.megaMenu.columns.map((column, colIndex) => (
                              <div key={colIndex} className="border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h4>
                                <ul className="space-y-3">
                                  {column.items.map((menuItem, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link 
                                        to={menuItem.to} 
                                        className="text-gray-600 hover:text-indigo-600 block py-1 transition-colors"
                                        onClick={closeAllMenus}
                                      >
                                        {menuItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          
                          {/* Featured */}
                          {item.megaMenu.featured && (
                            <div className="w-1/3 pl-6 border-l border-gray-200">
                              <Link 
                                to={item.megaMenu.featured.to} 
                                className="block group transition-transform hover:scale-[1.02]"
                                onClick={closeAllMenus}
                              >
                                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 mb-2 transition-colors">
                                  {item.megaMenu.featured.title}
                                </h4>
                                <p className="text-gray-600 mb-3">{item.megaMenu.featured.description}</p>
                                <span className="text-indigo-600 font-medium group-hover:text-indigo-800 transition-colors">Shop Now →</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`font-medium px-4 py-2 rounded-lg transition-colors flex items-center ${
                        isScrolled 
                          ? (activeDropdown === item.name ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')
                          : (activeDropdown === item.name ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-800')
                      }`}
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <svg 
                        className={`ml-1 w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div className="absolute left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 animate-fadeIn mt-1">
                        <ul>
                          {item.dropdown.map((dropdownItem, index) => (
                            <li key={index}>
                              {dropdownItem.action ? (
                                <button
                                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                  onClick={() => {
                                    closeAllMenus();
                                    dropdownItem.action();
                                  }}
                                >
                                  {dropdownItem.name}
                                </button>
                              ) : (
                                <Link
                                  to={dropdownItem.to}
                                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                  onClick={closeAllMenus}
                                >
                                  {dropdownItem.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-white hover:bg-indigo-800'
                    }`}
                    onClick={closeAllMenus}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Icon (Mobile) */}
            <button className="md:hidden p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <div className="relative" ref={cartRef}>
              <button 
                className={`p-1 relative ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setActiveMegaMenu(null);
                  setActiveDropdown(null);
                  setIsAccountOpen(false);
                }}
                aria-label="Toggle cart popup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>

              {/* Cart Popup */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 z-50 animate-fadeIn">
                  <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-3">Cart Items</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                  ) : (
                    <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
                      {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between py-3">
                          <span className="font-medium text-gray-800">{item.name} x {item.quantity}</span>
                          <span className="font-semibold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex justify-between font-extrabold text-indigo-700 text-lg">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      to="/cart"
                      className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700 transition-colors font-semibold"
                      onClick={closeAllMenus}
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Account Icon */}
            <div className="relative" ref={accountRef}>
              <button
                className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => {
                  setIsAccountOpen(!isAccountOpen);
                  setActiveMegaMenu(null);
                  setActiveDropdown(null);
                  setIsCartOpen(false);
                }}
                aria-label="Toggle account menu"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <span className="hidden lg:inline font-medium">Account</span>
              </button>

              {/* Account Dropdown */}
              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded transition-colors"
                    onClick={closeAllMenus}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 rounded transition-colors"
                    onClick={() => {
                      closeAllMenus();
                      alert('Logout clicked (placeholder)');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-4 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`mt-4 md:hidden px-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-gray-100 pb-2">
                {item.megaMenu || item.dropdown ? (
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                      onClick={() => {
                        if (activeDropdown === item.name) {
                          setActiveDropdown(null);
                        } else {
                          setActiveDropdown(item.name);
                        }
                      }}
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <svg 
                        className={`ml-2 w-5 h-5 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {(item.megaMenu || item.dropdown) && activeDropdown === item.name && (
                      <div className="pl-4 mt-2 border-l-2 border-indigo-200">
                        {item.megaMenu ? (
                          <div className="space-y-4">
                            {item.megaMenu.columns.map((column, colIndex) => (
                              <div key={colIndex} className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{column.title}</h4>
                                <ul className="space-y-2 pl-2">
                                  {column.items.map((menuItem, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link 
                                        to={menuItem.to} 
                                        className="text-gray-600 hover:text-indigo-600 block py-1 transition-colors"
                                        onClick={closeAllMenus}
                                      >
                                        {menuItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            {item.megaMenu.featured && (
                              <div className="mt-6">
                                <Link 
                                  to={item.megaMenu.featured.to} 
                                  className="block group"
                                  onClick={closeAllMenus}
                                >
                                  <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-24" />
                                  </div>
                                  <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 mb-1 transition-colors">
                                    {item.megaMenu.featured.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm">{item.megaMenu.featured.description}</p>
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : item.dropdown ? (
                          <ul className="space-y-2">
                            {item.dropdown.map((dropdownItem, index) => (
                              <li key={index}>
                                {dropdownItem.action ? (
                                  <button
                                    className="block w-full text-left py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                                    onClick={() => {
                                      closeAllMenus();
                                      dropdownItem.action();
                                    }}
                                  >
                                    {dropdownItem.name}
                                  </button>
                                ) : (
                                  <Link
                                    to={dropdownItem.to}
                                    className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                                    onClick={closeAllMenus}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className="block py-3 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
                    onClick={closeAllMenus}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}