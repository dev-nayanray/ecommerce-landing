import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  getBlogPosts,
  getPostCategories
} from '../api/wordpressAPI';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch posts and categories simultaneously
        const [postsResponse, categoriesResponse] = await Promise.all([
          getBlogPosts(),
          getPostCategories()
        ]);
        
        // Filter out uncategorized (ID 1)
        const filteredCategories = categoriesResponse.data.filter(
          cat => cat.id !== 1 && cat.count > 0
        );
        
        setCategories(filteredCategories);
        
        // Transform WordPress posts to our format
        const transformedPosts = postsResponse.data.map(post => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
          date: new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          author: post._embedded?.author?.[0]?.name || 'Admin',
          readTime: Math.ceil(post.content.rendered.split(/\s+/).length / 200) + ' min read',
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
          categoryId: post.categories?.[0] || 1,
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
          featured: post.sticky || false
        }));
        
        setPosts(transformedPosts);
        
        // Set the first sticky post as featured, or first post if none
        const stickyPost = transformedPosts.find(post => post.featured);
        setFeaturedPost(stickyPost || transformedPosts[0]);
        
      } catch (err) {
        console.error('Blog fetch error:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Filter non-featured posts
  const recentPosts = posts.filter(post => !post.featured).slice(0, 3);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-800 mt-4">{error}</h3>
          <button 
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

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
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="h-96 lg:h-auto relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Featured
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-indigo-600 font-semibold mb-3">{featuredPost.category}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500">{featuredPost.date} · {featuredPost.readTime}</div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Recent posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
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
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm"
                  >
                    Read
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/blog/category/${category.id}`}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-8">
          <Link 
            to="/blog" 
            className="inline-block px-8 py-3.5 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            View All Articles
          </Link>
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