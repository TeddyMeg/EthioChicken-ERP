import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight } from 'lucide-react';
import { useCollectionStore } from '../../store/useCollectionStore';

const Collections = () => {
  const { items, removeItem } = useCollectionStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your collection is empty</h2>
        <p className="text-gray-600 mb-8">Save your favorite products to your collection</p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Browse Products
          <ChevronRight size={20} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">My Collection</h1>
        <p className="text-gray-600 mt-2">Your favorite products</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeItem(product._id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart size={20} className="text-red-600" fill="currentColor" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-bold">
                  ETB {product.price.toLocaleString()}
                </span>
                <Link
                  to={`/products/${product._id}`}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;