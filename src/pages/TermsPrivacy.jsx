import { useState, useEffect, useRef } from 'react';

export default function TermsPrivacy() {
  const [activeSection, setActiveSection] = useState('terms');
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const sections = contentRef.current.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 tracking-tight">
              Terms & Privacy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trust is our priority. Understand how we protect your information and govern our services.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Table of Contents */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Table of Contents
                </h2>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('terms')}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                        activeSection === 'terms' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-3 ${activeSection === 'terms' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('privacy')}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                        activeSection === 'privacy' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-3 ${activeSection === 'privacy' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('cookies')}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                        activeSection === 'cookies' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-3 ${activeSection === 'cookies' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                      </svg>
                      Cookie Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('rights')}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                        activeSection === 'rights' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-3 ${activeSection === 'rights' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Your Rights
                    </button>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-3">Need help?</h3>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm">
                      Contact Us
                    </button>
                    <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium text-sm">
                      FAQ
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div ref={contentRef} className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Content Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">ElectroShop Policies</h2>
                      <p className="text-indigo-200">Last updated: June 22, 2025</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content Sections */}
                <div className="p-8">
                  {/* Terms of Service */}
                  <section id="terms" className="mb-16 scroll-mt-24">
                    <div className="flex items-start mb-6">
                      <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">Terms of Service</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Welcome to ElectroShop. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                        <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
                          Acceptance of Terms
                        </h3>
                        <p className="text-gray-600">
                          By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms, then you may not access the website.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                        <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
                          Use of the Site
                        </h3>
                        <p className="text-gray-600">
                          You may use our site only for lawful purposes and in accordance with these Terms. You agree not to use the site in any way that violates any applicable law or regulation.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                        <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
                          Intellectual Property Rights
                        </h3>
                        <p className="text-gray-600">
                          The content on our site, including text, graphics, logos, and images, is the property of ElectroShop or its content suppliers and protected by copyright laws.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                        <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
                          Prohibited Uses
                        </h3>
                        <p className="text-gray-600">
                          You may not use the site for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  {/* Privacy Policy */}
                  <section id="privacy" className="mb-16 scroll-mt-24">
                    <div className="flex items-start mb-6">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            We never sell your personal data to third parties. Your information is protected with industry-standard security measures.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          Information We Collect
                        </h3>
                        <p className="text-gray-600 text-sm">
                          We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes name, email, address, and payment information.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          How We Use Information
                        </h3>
                        <p className="text-gray-600 text-sm">
                          We use the information we collect to process transactions, provide customer support, improve our services, and communicate with you about products, services, and promotions.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                          </svg>
                          Data Security
                        </h3>
                        <p className="text-gray-600 text-sm">
                          We implement security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                      </div>
                      
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                          </svg>
                          Third-Party Sharing
                        </h3>
                        <p className="text-gray-600 text-sm">
                          We share information with third parties only as necessary to provide our services (e.g., payment processors), and never for marketing purposes without your explicit consent.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  {/* Cookie Policy */}
                  <section id="cookies" className="mb-16 scroll-mt-24">
                    <div className="flex items-start mb-6">
                      <div className="bg-amber-100 p-3 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">Cookie Policy</h2>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Our Use of Cookies</h3>
                          <p className="mt-1 text-gray-600">
                            We use cookies to enhance your experience, analyze site traffic, and personalize content. By continuing to browse, you consent to our use of cookies.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="essential"
                              name="essential"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                              disabled
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="essential" className="font-medium text-gray-700">
                              Essential Cookies
                            </label>
                            <p className="text-gray-500">Required for site functionality</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="analytics"
                              name="analytics"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="analytics" className="font-medium text-gray-700">
                              Analytics Cookies
                            </label>
                            <p className="text-gray-500">Help us improve our services</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="marketing"
                              name="marketing"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketing" className="font-medium text-gray-700">
                              Marketing Cookies
                            </label>
                            <p className="text-gray-500">Personalize ads and content</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="preferences"
                              name="preferences"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="preferences" className="font-medium text-gray-700">
                              Preference Cookies
                            </label>
                            <p className="text-gray-500">Remember your settings</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h3 className="font-bold text-gray-800 mb-3">Managing Cookies</h3>
                      <p className="text-gray-600 mb-4">
                        You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and set most browsers to prevent them from being placed.
                      </p>
                      <p className="text-gray-600">
                        If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                      </p>
                    </div>
                  </section>
                  
                  {/* Your Rights */}
                  <section id="rights" className="scroll-mt-24">
                    <div className="flex items-start mb-6">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">Your Rights</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                        <div className="flex items-center mb-4">
                          <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Access Your Data</h3>
                        </div>
                        <p className="text-gray-600">
                          You have the right to request access to the personal data we hold about you and to receive a copy of that data.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                        <div className="flex items-center mb-4">
                          <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Request Deletion</h3>
                        </div>
                        <p className="text-gray-600">
                          You can request that we delete your personal data in certain circumstances, subject to legal obligations.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                        <div className="flex items-center mb-4">
                          <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Correct Information</h3>
                        </div>
                        <p className="text-gray-600">
                          You have the right to request correction of inaccurate or incomplete personal data we hold about you.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                        <div className="flex items-center mb-4">
                          <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Data Portability</h3>
                        </div>
                        <p className="text-gray-600">
                          You have the right to receive your personal data in a structured, commonly used format and to transmit that data to another controller.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Exercise Your Rights</h3>
                      <p className="text-gray-600 mb-6">
                        To exercise any of these rights, please contact us using the information below. We will respond to your request within 30 days.
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors font-medium flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Email Us
                        </button>
                        <button className="bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-600 py-2 px-6 rounded-lg transition-colors font-medium flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Call Support
                        </button>
                        <button className="bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-600 py-2 px-6 rounded-lg transition-colors font-medium flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Open Support Ticket
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
                
                {/* Content Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      © 2025 ElectroShop. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                      <a href="#" className="text-gray-500 hover:text-indigo-600">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-indigo-600">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-indigo-600">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}