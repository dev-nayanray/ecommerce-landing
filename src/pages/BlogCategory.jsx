import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getPostsByCategory,
  getPostCategories,
  getPostById
} from '../api/wordpressAPI';

const BlogCategory = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          getPostsByCategory(id),
          getPostCategories()
        ]);
        
        const foundCategory = categoriesResponse.data.find(cat => cat.id === parseInt(id));
        setCategory(foundCategory);
        
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
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        }));
        
        setPosts(transformedPosts);
      } catch (err) {
        setError('Failed to load category posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ... similar loading/error handling as Blog component

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        {category ? category.name : 'Category'} Posts
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          // Render post cards similar to Blog component
        ))}
      </div>
    </div>
  );
};

export default BlogCategory;