import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminOrders } from '../../hooks/useAdminOrders';
import OrderList from '../../components/admin/OrderList.tsx';
import { Package } from 'lucide-react';


const ManageOrders = () => {
  const { orders, loading, fetchAllOrders, updateOrderStatus, updateDeliveryDate } = useAdminOrders();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        <p className="text-gray-600 mt-2">View and manage customer orders</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Package className="animate-spin text-red-600" size={40} />
        </div>
      ) : (
        <OrderList orders={orders} onUpdateStatus={updateOrderStatus} onUpdateDeliveryDate={updateDeliveryDate}/>
      )}
    </div>
  );
};

export default ManageOrders;