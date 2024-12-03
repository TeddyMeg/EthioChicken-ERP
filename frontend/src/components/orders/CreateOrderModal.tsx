import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, Plus, Minus } from 'lucide-react';
import { Product } from '../../hooks/useProducts';

interface CreateOrderModalProps {
  products: Product[];
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

const CreateOrderModal = ({ products, onSubmit, onClose }: CreateOrderModalProps) => {
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<Array<{
    product: Product;
    quantity: number;
  }>>([]);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    region: '',
    country: 'Ethiopia'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const totalPrice = orderItems.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      
      await onSubmit({
        orderItems: orderItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress,
        paymentMethod: 'CBE_TRANSFER',
        totalPrice,
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (productId: string) => {
    const product = products.find(p => p._id === productId)!;
    if (!orderItems.some(item => item.product._id === productId)) {
      setOrderItems([
        ...orderItems,
        {
          product,
          quantity: product.minimumOrder
        }
      ]);
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    setOrderItems(items => 
      items.map(item => {
        if (item.product._id === productId) {
          const newQuantity = Math.max(
            item.product.minimumOrder,
            Math.min(item.quantity + change, item.product.stock)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeProduct = (productId: string) => {
    setOrderItems(items => items.filter(item => item.product._id !== productId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create New Order</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.product._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">
                          ETB {item.product.price.toLocaleString()} per unit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product._id, -1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product._id, 1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(item.product._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <select
                    onChange={(e) => addProduct(e.target.value)}
                    value=""
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Add Product...</option>
                    {products
                      .filter(p => !orderItems.some(item => item.product._id === p._id))
                      .map(product => (
                        <option key={product._id} value={product._id}>
                          {product.name} - ETB {product.price.toLocaleString()}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.region}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || orderItems.length === 0}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Creating...
                  </>
                ) : (
                  'Create Order'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateOrderModal;