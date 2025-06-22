import { useState, useEffect, useRef } from 'react';

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState('company');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Tech enthusiast with 15+ years in electronics retail. Founded ElectroShop in 2015.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "CTO",
      bio: "Former Google engineer leading our tech innovation and platform development.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      name: "David Chen",
      role: "Head of Product",
      bio: "Expert in consumer electronics with a passion for finding innovative gadgets.",
      img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Customer Experience",
      bio: "Dedicated to ensuring every customer has an exceptional shopping experience.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
  ];

  // Job openings data
  const jobOpenings = [
    { id: 1, title: "Frontend Developer", department: "Engineering", location: "Remote" },
    { id: 2, title: "Product Designer", department: "Design", location: "San Francisco" },
    { id: 3, title: "Marketing Specialist", department: "Marketing", location: "New York" },
    { id: 4, title: "Supply Chain Analyst", department: "Operations", location: "Chicago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 tracking-tight">
              About ElectroShop
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our story, mission, and the passionate team behind your favorite electronics marketplace.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Table of Contents */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Table of Contents
                </h2>
                <ul className="space-y-3">
                  {[
                    { id: 'company', label: 'Our Company', icon: '🏢' },
                    { id: 'mission', label: 'Our Mission', icon: '🎯' },
                    { id: 'team', label: 'Our Team', icon: '👥' },
                    { id: 'careers', label: 'Careers', icon: '💼' },
                    { id: 'contact', label: 'Contact Us', icon: '📞' },
                  ].map((item) => (
                    <li key={item.id}>
                      <button 
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                          activeSection === item.id 
                            ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm border-l-4 border-indigo-600' 
                            : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Main Content */}
            <div ref={contentRef} className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">ElectroShop: Connecting You to Tomorrow's Tech</h2>
                    <div className="flex space-x-2 mt-3 md:mt-0">
                      {['📱', '💻', '🎮', '📺', '🔌'].map((emoji, i) => (
                        <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-20">
                  {/* Company Section */}
                  <section id="company" className="scroll-mt-24">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Founded in 2015, ElectroShop started as a small passion project in a garage. Today, we're one of the fastest-growing e-commerce platforms for electronics in North America, serving over 2 million customers annually.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-indigo-50 p-4 rounded-lg text-center">
                            <div className="text-3xl font-bold text-indigo-700">2M+</div>
                            <div className="text-gray-600">Happy Customers</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-3xl font-bold text-purple-700">15K+</div>
                            <div className="text-gray-600">Products Available</div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80 flex items-center justify-center text-gray-500">
                          Company Headquarters Image
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  {/* Mission Section */}
                  <section id="mission" className="scroll-mt-24">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission & Values</h3>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
                      <p className="text-lg text-gray-700 italic">
                        "To make cutting-edge technology accessible to everyone while providing an exceptional shopping experience."
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Authenticity</h4>
                          <p className="text-gray-600">Genuine products with verified warranties from trusted manufacturers.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Customer First</h4>
                          <p className="text-gray-600">24/7 support and hassle-free returns because your satisfaction matters.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Innovation</h4>
                          <p className="text-gray-600">Constantly exploring new technologies to bring you tomorrow's devices today.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Security</h4>
                          <p className="text-gray-600">State-of-the-art protection for your data and transactions.</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  {/* Team Section */}
                  <section id="team" className="scroll-mt-24">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h3>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      Our diverse team of tech enthusiasts, customer advocates, and logistics experts work together to bring you the best shopping experience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0 mr-4" />
                          <div>
                            <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                            <div className="text-indigo-600 mb-2">{member.role}</div>
                            <p className="text-gray-600">{member.bio}</p>
                            <div className="flex mt-3 space-x-3">
                              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                </svg>
                              </button>
                              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  {/* Careers Section */}
                  <section id="careers" className="scroll-mt-24">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Join Our Team</h3>
                    <p className="text-gray-600 mb-8">
                      We're always looking for passionate individuals to join our growing family. At ElectroShop, you'll work with cutting-edge technology in a supportive environment.
                    </p>
                    
                    <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                      <h4 className="font-bold text-xl text-indigo-800 mb-4">Current Openings</h4>
                      <div className="space-y-4">
                        {jobOpenings.map((job) => (
                          <div key={job.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div>
                              <div className="font-bold text-gray-800">{job.title}</div>
                              <div className="text-sm text-gray-600">{job.department} • {job.location}</div>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                              Apply Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Don't see your dream role? Send us your resume anyway!</p>
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                        Submit General Application
                      </button>
                    </div>
                  </section>
                  
                  {/* Contact Section */}
                  <section id="contact" className="scroll-mt-24">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500 mb-6">
                          Office Location Map
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Headquarters</h4>
                              <p className="text-gray-600">123 Tech Avenue, San Francisco, CA 94103</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Phone</h4>
                              <p className="text-gray-600">1-800-123-4567</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Email</h4>
                              <p className="text-gray-600">contact@electroshop.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h4 className="font-bold text-xl text-gray-800 mb-4">Send us a message</h4>
                          {formSubmitted ? (
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Thank you! Your message has been sent.
                            </div>
                          ) : null}
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-colors"
                                required
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                              Send Message
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}