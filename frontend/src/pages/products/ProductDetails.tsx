import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useCartStore } from '../../store/useCartStore';
import { useCollectionStore } from '../../store/useCollectionStore';
import { useReviews } from '../../hooks/useReviews';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewList from '../../components/reviews/ReviewList';
import { 
  Package2, 
  Loader2, 
  ChevronLeft, 
  ShoppingCart,
  Info,
  Check,
  Heart
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: 'chicks' | 'feeds';
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  specifications: Map<string, string>;
  minimumOrder: number;
  isAvailable: boolean;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);
  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToCollection, hasItem: isInCollection, removeItem: removeFromCollection } = useCollectionStore();
  const { reviews, loading: reviewsLoading, fetchProductReviews, createReview } = useReviews(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setQuantity(data.minimumOrder);
        fetchProductReviews();
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (product) {
      const newQuantity = Math.max(product.minimumOrder, Math.min(value, product.stock));
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (product) {
      addToCart(product, quantity);
      toast.success('Added to cart successfully');
    }
  };

  const handleCollectionToggle = () => {
    if (!isAuthenticated) {
      toast.info('Please login to manage collections');
      navigate('/login');
      return;
    }

    if (product) {
      if (isInCollection(product._id)) {
        removeFromCollection(product._id);
        toast.success('Removed from collection');
      } else {
        addToCollection(product);
        toast.success('Added to collection');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-red-600 mb-8"
      >
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
            product.category === 'chicks' 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {product.category}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <button
              onClick={handleCollectionToggle}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart
                size={24}
                className={isInCollection(product._id) ? 'text-red-600 fill-current' : 'text-gray-400'}
              />
            </button>
          </div>
          
          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Price</span>
              <span className="text-2xl font-bold text-red-600">
                ETB {product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stock</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Minimum Order</span>
              <span className="font-medium text-gray-900">{product.minimumOrder}</span>
            </div>
          </div>

          {product.specifications && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-start space-x-2">
                    <Check size={16} className="text-green-600 mt-1" />
                    <div>
                      <span className="font-medium text-gray-900">{key}:</span>
                      <span className="text-gray-600 ml-2">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-600">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min={product.minimumOrder}
                max={product.stock}
                className="w-24 px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable || product.stock === 0 || orderLoading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium space-x-2 ${
                product.isAvailable && product.stock > 0
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {orderLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {!product.isAvailable && (
              <div className="flex items-center space-x-2 text-yellow-600">
                <Info size={16} />
                <span>This product is currently unavailable</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {isAuthenticated && (
            <div className="mb-8">
              <ReviewForm onSubmit={createReview} />
            </div>
          )}
          {reviewsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;