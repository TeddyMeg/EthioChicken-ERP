import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Product } from '../../hooks/useProducts';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= product.minimumOrder && newQuantity <= product.stock) {
      updateQuantity(product._id, newQuantity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-red-600 font-medium">ETB {product.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= product.minimumOrder}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= product.stock}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold">ETB {(product.price * quantity).toLocaleString()}</p>
        <button
          onClick={() => removeItem(product._id)}
          className="text-red-600 hover:text-red-700 mt-2"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;