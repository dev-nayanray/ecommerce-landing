import React, { useState } from 'react';

const Returnpolicy = () => {
  const [activeTab, setActiveTab] = useState('return');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqItems = [
    {
      question: "How long do I have to return an item?",
      answer: "You have 30 days from the date of delivery to initiate a return. The item must be postmarked within 7 days of initiating the return."
    },
    {
      question: "What condition should items be in for return?",
      answer: "Items must be in their original condition: unused, unopened, with all tags and packaging intact. Products must not show any signs of wear or damage."
    },
    {
      question: "How will I receive my refund?",
      answer: "Refunds are issued to the original payment method within 3-5 business days after we receive and process your return. You'll receive an email notification once your refund has been processed."
    },
    {
      question: "Are there any items I can't return?",
      answer: "Yes, we cannot accept returns for: personalized or custom-made products, digital downloads, gift cards, and products marked as 'final sale'."
    },
    {
      question: "What if I received a damaged or defective item?",
      answer: "Contact us immediately at support@electroshop.com with photos of the damage. We'll arrange a free return and send a replacement at no cost to you."
    }
  ];

  const timelineSteps = [
    { title: "Initiate Return", time: "Within 30 days", icon: "📱" },
    { title: "Package Item", time: "Use original packaging", icon: "📦" },
    { title: "Ship Back", time: "Within 7 days", icon: "🚚" },
    { title: "Processing", time: "2-3 business days", icon: "⏳" },
    { title: "Refund Issued", time: "3-5 business days", icon: "💳" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ElectroShop Return Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We stand behind our products. Our hassle-free return policy ensures you can shop with confidence.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex bg-white rounded-full shadow-md overflow-hidden">
              <button 
                onClick={() => setActiveTab('return')}
                className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${
                  activeTab === 'return' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Return Policy
              </button>
              <button 
                onClick={() => setActiveTab('exchange')}
                className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${
                  activeTab === 'exchange' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Exchange Policy
              </button>
              <button 
                onClick={() => setActiveTab('warranty')}
                className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${
                  activeTab === 'warranty' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Warranty Info
              </button>
            </div>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-indigo-100 p-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Easy Returns</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Return any item within 30 days for a full refund. No questions asked.
              </p>
              <div className="text-indigo-600 font-medium flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-purple-100 p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🚚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Free Shipping</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Free return shipping on all eligible orders over $50. We provide prepaid labels.
              </p>
              <div className="text-purple-600 font-medium flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-green-100 p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Refunds</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Receive your refund within 3-5 business days after we receive your return.
              </p>
              <div className="text-green-600 font-medium flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Simple 5-Step Return Process</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Returning an item to ElectroShop is quick and easy. Follow these simple steps to get your refund.
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-indigo-200 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 z-10">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 w-full">
                    <div className="text-indigo-600 font-medium">{step.time}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <div className="text-sm text-gray-500">
                      {index === 0 && "Log in to your account or use our return portal"}
                      {index === 1 && "Include all original packaging and accessories"}
                      {index === 2 && "Attach our prepaid label and drop off at carrier"}
                      {index === 3 && "We inspect and verify your return"}
                      {index === 4 && "Money returned to your original payment method"}
                    </div>
                  </div>
                  <div className="absolute top-8 text-lg font-bold text-indigo-600 hidden md:block" style={{ left: 'calc(100% + 20px)' }}>
                    {index < timelineSteps.length - 1 && "→"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg flex items-center transition-colors">
              Start a Return
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-10">
            Find answers to common questions about our return policy and process.
          </p>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: expandedSections[index] ? '500px' : '68px',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              >
                <button
                  className="w-full text-left p-5 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-indigo-600 transform transition-transform ${expandedSections[index] ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div 
                  className={`px-5 pb-5 pt-2 text-gray-600 ${expandedSections[index] ? 'block' : 'hidden'}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="mb-6 opacity-90">
              Our customer support team is here to assist you with any return-related questions or issues.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="opacity-90">+1 (800) 123-4567</p>
                  <p className="text-sm opacity-80 mt-1">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="opacity-90">returns@electroshop.com</p>
                  <p className="text-sm opacity-80 mt-1">Average response time: 4 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="opacity-90">Available on our website</p>
                  <p className="text-sm opacity-80 mt-1">Mon-Sun, 8am-10pm EST</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Return Center</h2>
            <p className="text-gray-600 mb-6">
              Start your return process online. Simply enter your order details to begin.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your order number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter the email used for ordering"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Return</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Select a reason</option>
                  <option>Changed my mind</option>
                  <option>Received wrong item</option>
                  <option>Item defective/damaged</option>
                  <option>Item not as described</option>
                  <option>Other</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Start Return Process
              </button>
            </form>
          </div>
        </div>

        {/* Policy Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Return Policy</h2>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-3">General Return Guidelines</h3>
            <p className="text-gray-600 mb-4">
              At ElectroShop, we want you to be completely satisfied with your purchase. If you're not happy with an item, you may return it within 30 days of delivery for a full refund. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Return Process</h3>
            <p className="text-gray-600 mb-4">
              To start a return, you can contact us at returns@electroshop.com. If your return is accepted, we'll send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Damages and Issues</h3>
            <p className="text-gray-600 mb-4">
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Exceptions / Non-Returnable Items</h3>
            <p className="text-gray-600 mb-4">
              Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Exchanges</h3>
            <p className="text-gray-600 mb-4">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Refunds</h3>
            <p className="text-gray-600">
              We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returnpolicy;