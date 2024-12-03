import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Order } from '../../hooks/useOrders';

interface ReturnOrderFormProps {
  order: Order;
  onSubmit: (data: {
    orderId: string;
    reason: string;
    items: { product: string; quantity: number }[];
    deliveryMethod: 'company_pickup' | 'agent_delivery';
  }) => Promise<void>;
  onCancel: () => void;
}

const ReturnOrderForm = ({ order, onSubmit, onCancel }: ReturnOrderFormProps) => {
  const [reason, setReason] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [deliveryMethod, setDeliveryMethod] = useState<'company_pickup' | 'agent_delivery'>('company_pickup');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = Object.entries(selectedItems).map(([product, quantity]) => ({
      product,
      quantity
    }));

    if (items.length === 0) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        orderId: order._id,
        reason,
        items,
        deliveryMethod
      });
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Return Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Items to Return
            </label>
            <div className="space-y-2">
              {order.orderItems.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity ordered: {item.quantity}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={item.quantity}
                    value={selectedItems[item.product._id] || 0}
                    onChange={(e) => setSelectedItems({
                      ...selectedItems,
                      [item.product._id]: parseInt(e.target.value)
                    })}
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Return
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Method
            </label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value as 'company_pickup' | 'agent_delivery')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="company_pickup">Company Pickup</option>
              <option value="agent_delivery">Agent Delivery</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(selectedItems).length === 0}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                'Submit Return Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ReturnOrderForm;