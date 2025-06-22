import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call with 1.5s delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-6 max-w-3xl bg-white p-12 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center tracking-wide drop-shadow-lg">Contact Us</h1>
        
        {submitted ? (
          <div className="text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-green-600 text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {errors.submit && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl">
                {errors.submit}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">
                Name {errors.name && <span className="text-red-500 text-sm font-normal">- {errors.name}</span>}
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition`}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">
                Email {errors.email && <span className="text-red-500 text-sm font-normal">- {errors.email}</span>}
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition`}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-3 text-lg">
                Message {errors.message && <span className="text-red-500 text-sm font-normal">- {errors.message}</span>}
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                value={formData.message} 
                onChange={handleChange} 
                className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition`}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`bg-indigo-600 text-white px-8 py-4 rounded-2xl font-extrabold transition-colors w-full flex items-center justify-center ${
                isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-indigo-700 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}