import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/wordpressAPI';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost({
          id: response.data.id,
          title: response.data.title.rendered,
          content: response.data.content.rendered,
          date: new Date(response.data.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          author: response.data._embedded?.author?.[0]?.name || 'Admin',
          image: response.data._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          categories: response.data._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || []
        });
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
          {post.categories.length > 0 && (
            <>
              <span className="mx-2">•</span>
              <div className="flex space-x-2">
                {post.categories.map((category, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto rounded-xl mb-8"
          />
        )}
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
};

export default BlogPost;