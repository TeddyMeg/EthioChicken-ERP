import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminReturns } from '../../hooks/useAdminReturns';
import ReturnOrderList from '../../components/returns/ReturnOrderList';
import { Package } from 'lucide-react';

const ManageReturns = () => {
  const {
    returns,
    loading,
    fetchAllReturns,
    updateReturnStatus,
    confirmProductReceived
  } = useAdminReturns();

  useEffect(() => {
    fetchAllReturns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Manage Returns</h1>
        <p className="text-gray-600 mt-2">
          Review and process return requests from agents
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Package className="animate-spin text-red-600" size={40} />
        </div>
      ) : (
        <ReturnOrderList
          returns={returns}
          isAdmin={true}
          onUpdateStatus={updateReturnStatus}
          onConfirmReceived={confirmProductReceived}
        />
      )}
    </div>
  );
};

export default ManageReturns;