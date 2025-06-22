import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Demo categories data
const demoCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Jewelery' },
  { id: 3, name: "Men's Clothing" },
  { id: 4, name: "Women's Clothing" },
  { id: 5, name: 'Shoes' },
  { id: 6, name: 'Accessories' },
  { id: 7, name: 'Beauty' },
  { id: 8, name: 'Home' }
];

// Category image mapping
const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  jewelery: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  "men's clothing": 'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  "women's clothing": 'https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  accessories: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  beauty: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
  home: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setCategories(demoCategories);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Get image for category using lowercase keys
  const getCategoryImage = (categoryName) => {
    const key = categoryName.toLowerCase();
    return categoryImages[key] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover products curated for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoCategories.map((item) => (
              <div key={item.id} className="bg-gray-200 border-2 border-dashed rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
       

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg h-64 border border-gray-100">
                <img 
                  src={getCategoryImage(cat.name)}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-200 font-medium">120+ Products</span>
                    <button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium transition-colors">
                      Browse
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3.5 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
}