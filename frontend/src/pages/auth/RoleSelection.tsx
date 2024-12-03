import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck } from 'lucide-react';

const RoleSelection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-12 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Choose Registration Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/register/agent">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <Users className="w-16 h-16 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Register as Agent</h3>
              <p className="text-gray-600">
                Join as a distribution agent to sell EthioChicken products
              </p>
            </div>
          </motion.div>
        </Link>

        <Link to="/register/admin">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-16 h-16 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Register as Admin</h3>
              <p className="text-gray-600">
                Administrative access for EthioChicken staff members
              </p>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoleSelection;