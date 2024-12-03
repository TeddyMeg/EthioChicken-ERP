import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  // Get total revenue
  const orders = await Order.find({});
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Get total agents
  const totalAgents = await User.countDocuments({ role: 'agent' });

  // Get chicks ordered and delivered
  const chicksOrders = orders.filter(order => 
    order.orderItems.some(item => 
      item.product.category === 'chicks'
    )
  );
  
  const chicksOrdered = chicksOrders.reduce((acc, order) => 
    acc + order.orderItems.reduce((sum, item) => 
      item.product.category === 'chicks' ? sum + item.quantity : sum, 0
    ), 0
  );

  const chicksDelivered = chicksOrders.filter(order => 
    order.status === 'delivered'
  ).reduce((acc, order) => 
    acc + order.orderItems.reduce((sum, item) => 
      item.product.category === 'chicks' ? sum + item.quantity : sum, 0
    ), 0
  );

  // Get feeds sold
  const feedsSold = orders.reduce((acc, order) => 
    acc + order.orderItems.reduce((sum, item) => 
      item.product.category === 'feeds' ? sum + item.quantity : sum, 0
    ), 0
  );

  // Get stock available
  const products = await Product.find({});
  const stockAvailable = products.reduce((acc, product) => acc + product.stock, 0);

  // Generate revenue data for chart
  const last7Months = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toLocaleString('default', { month: 'short' });
  }).reverse();

  const revenueData = {
    labels: last7Months,
    datasets: [{
      label: 'Revenue',
      data: last7Months.map(() => Math.floor(Math.random() * 100000) + 50000),
      borderColor: 'rgb(220, 38, 38)',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      fill: true
    }]
  };

  // Generate referral stats
  const referralStats = [
    { name: 'Direct Referrals', value: 45, color: 'red' },
    { name: 'Social Media', value: 30, color: 'blue' },
    { name: 'Website', value: 15, color: 'yellow' },
    { name: 'Trade Shows', value: 10, color: 'green' }
  ];

  res.json({
    totalRevenue,
    totalAgents,
    chicksOrdered,
    chicksDelivered,
    feedsSold,
    stockAvailable,
    revenueData,
    referralStats
  });
});

export { getDashboardStats };