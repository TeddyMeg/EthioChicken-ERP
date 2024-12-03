import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  Package,
  Truck,
  ShoppingCart,
  Egg
} from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
// import ReferralStats from '../../components/dashboard/ReferralStats';
import { useDashboard } from '../../hooks/useDashboard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { stats, loading, error } = useDashboard();

  if (error) {
    toast.error(error);
  }

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin text-red-600">
          <Package size={40} />
        </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your business today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          metric={`ETB ${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="red"
        />
        <StatCard
          title="Total Agents"
          metric={stats.totalAgents}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Chicks Ordered"
          metric={stats.chicksOrdered.toLocaleString()}
          icon={ShoppingCart}
          color="yellow"
        />
        <StatCard
          title="Chicks Delivered"
          metric={stats.chicksDelivered.toLocaleString()}
          icon={Truck}
          color="green"
        />
        <StatCard
          title="Feeds Sold"
          metric={`${stats.feedsSold.toLocaleString()} kg`}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Stock Available"
          metric={stats.stockAvailable.toLocaleString()}
          icon={Egg}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.revenueData} />
        </div>
        {/* <div>
          <ReferralStats data={stats.referralStats} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;