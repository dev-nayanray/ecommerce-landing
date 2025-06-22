import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of E-commerce: Trends to Watch in 2023",
      excerpt: "Discover the emerging technologies and consumer behaviors shaping online shopping experiences.",
      date: "May 15, 2023",
      author: "Alex Morgan",
      readTime: "6 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      featured: true
    },
    {
      id: 2,
      title: "10 Sustainable Shopping Practices You Can Start Today",
      excerpt: "Learn how to make eco-friendly choices without compromising on style or quality.",
      date: "April 28, 2023",
      author: "Taylor Green",
      readTime: "5 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1465433045946-ba6506ce5a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 3,
      title: "How to Style Your Home Office for Productivity and Comfort",
      excerpt: "Transform your workspace with these ergonomic and aesthetic design tips.",
      date: "April 12, 2023",
      author: "Jordan Lee",
      readTime: "7 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 4,
      title: "The Art of Minimalism: Simplifying Your Digital Life",
      excerpt: "Declutter your digital space and improve your focus with these practical strategies.",
      date: "March 30, 2023",
      author: "Casey Smith",
      readTime: "8 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-bold px-4 py-1 rounded-full mb-3">
            LATEST INSIGHTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Our Blog
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover tips, trends, and industry insights from our expert contributors
          </p>
        </div>
        
        {/* Featured blog post */}
        <div className="mb-16">
          {blogPosts.filter(post => post.featured).map(post => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="h-96 lg:h-auto relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Featured
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-indigo-600 font-semibold mb-3">{post.category}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.date} · {post.readTime}</div>
                    </div>
                  </div>
                  
                  <a 
                    href="#"
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Recent posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <span className="text-gray-500 text-sm">{post.date} · {post.readTime}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <span className="ml-2 text-sm font-medium text-gray-900">{post.author}</span>
                  </div>
                  
                  <a 
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm"
                  >
                    Read
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <a 
            href="#" 
            className="inline-block px-8 py-3.5 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            View All Articles
          </a>
        </div>
      </div>
      
      {/* Floating elements with animation */}
      <motion.div 
        className="absolute top-1/4 left-1/4"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Expert Insights
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4"
        animate={{ 
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Trending Topics
        </div>
      </motion.div>
    </section>
  );
};

export default Blog;