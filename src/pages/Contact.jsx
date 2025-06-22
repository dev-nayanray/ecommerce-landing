import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const contactInfo = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 5pm"
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: "support@company.com",
      description: "We reply within 24 hours"
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Office",
      details: "123 Innovation Blvd",
      description: "San Francisco, CA 94107"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line."
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we specialize in custom solutions tailored to your business needs. Contact us to discuss your specific requirements."
    },
    {
      question: "What are your business hours?",
      answer: "Our support team is available Monday to Friday from 9:00 AM to 6:00 PM PST. We also offer 24/7 emergency support for premium clients."
    },
    {
      question: "How do I schedule a consultation?",
      answer: "You can schedule a free 30-minute consultation directly through our website or by calling our office during business hours."
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
    
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            We'd love to hear from you. Our team is always ready to chat about your project, answer questions, or help you solve problems.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setActiveTab('contact')} 
              className={`px-6 py-3 rounded-full font-semibold ${activeTab === 'contact' ? 'bg-white text-indigo-600' : 'bg-indigo-700 hover:bg-indigo-800'}`}
            >
              Contact Form
            </button>
            <button 
              onClick={() => setActiveTab('faq')} 
              className={`px-6 py-3 rounded-full font-semibold ${activeTab === 'faq' ? 'bg-white text-indigo-600' : 'bg-indigo-700 hover:bg-indigo-800'}`}
            >
              FAQ
            </button>
            <button 
              onClick={() => setActiveTab('support')} 
              className={`px-6 py-3 rounded-full font-semibold ${activeTab === 'support' ? 'bg-white text-indigo-600' : 'bg-indigo-700 hover:bg-indigo-800'}`}
            >
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form or reach out to us directly using the contact details below. We're here to help!
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-700 font-medium">{item.details}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                    <a 
                      key={platform} 
                      href="#" 
                      className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center hover:bg-indigo-200 transition-colors"
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Location Map */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gray-200 border-2 border-dashed w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">Interactive Map</span>
              </div>
              <p className="mt-4 text-gray-600">
                Visit our headquarters. We'd love to show you around our innovation center!
              </p>
            </div>
          </div>
          
          {/* Contact Form / FAQ */}
          <div className="lg:col-span-2">
            {activeTab === 'contact' ? (
              <div className="bg-white p-10 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a message</h2>
                <p className="text-gray-600 mb-8">We'll get back to you as soon as possible</p>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errors.submit && (
                      <div className="bg-red-50 text-red-700 p-4 rounded-xl">
                        {errors.submit}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Full Name {errors.name && <span className="text-red-500 text-sm">- {errors.name}</span>}
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email Address {errors.email && <span className="text-red-500 text-sm">- {errors.email}</span>}
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject {errors.subject && <span className="text-red-500 text-sm">- {errors.subject}</span>}
                      </label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className={`w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Message {errors.message && <span className="text-red-500 text-sm">- {errors.message}</span>}
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="6" 
                        value={formData.message} 
                        onChange={handleChange} 
                        className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="consent" 
                        type="checkbox" 
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="consent" className="ml-2 text-gray-600">
                        I agree to the privacy policy and terms of service
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`mt-4 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold transition-colors w-full flex items-center justify-center ${
                        isSubmitting 
                          ? 'opacity-80 cursor-not-allowed' 
                          : 'hover:bg-indigo-700 hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Your Message...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            ) : activeTab === 'faq' ? (
              <div className="bg-white p-10 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-600 mb-8">Find answers to common questions about our services and support</p>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button className="flex justify-between items-center w-full p-6 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none">
                        <span className="text-lg">{faq.question}</span>
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      <div className="p-6 pt-0 text-gray-600">
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 bg-indigo-50 rounded-2xl p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h3>
                      <p className="text-gray-600 mb-4">Can't find the answer you're looking for? Our support team is happy to help.</p>
                      <button 
                        onClick={() => setActiveTab('contact')} 
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Support Center</h2>
                <p className="text-gray-600 mb-8">Get help with our products and services</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Knowledge Base</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Browse our extensive documentation and tutorials to find answers to common questions.
                    </p>
                    <a href="#" className="text-indigo-600 font-medium inline-flex items-center">
                      Browse Articles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Community Forum</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Join our community of users and experts to ask questions and share knowledge.
                    </p>
                    <a href="#" className="text-indigo-600 font-medium inline-flex items-center">
                      Join the Community
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Live Chat</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Chat with our support team in real-time for quick answers to your questions.
                    </p>
                    <a href="#" className="text-indigo-600 font-medium inline-flex items-center">
                      Start Chat
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                  
                  <div className="border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Phone Support</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Call us directly for personalized assistance with your account or technical issues.
                    </p>
                    <a href="#" className="text-indigo-600 font-medium inline-flex items-center">
                      Call +1 (555) 123-4567
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Support Team</h2>
            <p className="text-gray-600">
              Meet the dedicated professionals ready to assist you with any questions or issues you may have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 border-2 border-dashed flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Alex Morgan</h3>
                  <p className="text-indigo-600 font-medium mb-3">Support Specialist</p>
                  <p className="text-gray-600 mb-4">
                    With over 5 years of experience, Alex specializes in troubleshooting complex technical issues.
                  </p>
                  <div className="flex space-x-3">
                    {['twitter', 'linkedin', 'email'].map((platform) => (
                      <a 
                        key={platform} 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                      >
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}