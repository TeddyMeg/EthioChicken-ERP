import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Package2, Loader2 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { toast } from 'react-toastify';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'chicks' | 'feeds'>('all');
  const { products, loading, error } = useProducts(activeCategory === 'all' ? undefined : activeCategory);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600">
          High-quality day-old chicks and poultry feeds for your farming needs
        </p>
      </motion.div>

      <div className="flex justify-center mb-8 space-x-4">
        {['all', 'chicks', 'feeds'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as typeof activeCategory)}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-105"
          >
            <div className="relative h-64">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.category === 'chicks' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-red-600">
                  ETB {product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Package2 size={16} className="mr-1" />
                  Min. Order: {product.minimumOrder}
                </span>
              </div>
              <Link
                to={`/products/${product._id}`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                View Details
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Products;