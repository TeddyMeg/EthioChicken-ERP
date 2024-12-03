import asyncHandler from 'express-async-handler';
import ReturnOrder from '../models/returnOrderModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create return order request
// @route   POST /api/returns
// @access  Private/Agent
const createReturnOrder = asyncHandler(async (req, res) => {
  const { orderId, reason, items, deliveryMethod } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Calculate refund amount
  const refundAmount = items.reduce((total, item) => {
    const orderItem = order.orderItems.find(
      oi => oi.product.toString() === item.product.toString()
    );
    return total + (orderItem ? orderItem.price * item.quantity : 0);
  }, 0);

  const returnOrder = await ReturnOrder.create({
    order: orderId,
    user: req.user._id,
    reason,
    items,
    deliveryMethod,
    refundAmount
  });

  res.status(201).json(returnOrder);
});

// @desc    Update return order status (admin)
// @route   PUT /api/returns/:id/status
// @access  Private/Admin
const updateReturnStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const returnOrder = await ReturnOrder.findById(req.params.id);

  if (!returnOrder) {
    res.status(404);
    throw new Error('Return order not found');
  }

  returnOrder.status = status;
  if (adminNotes) returnOrder.adminNotes = adminNotes;

  // If approved and product received, update stock
  if (status === 'completed' && returnOrder.productReceived) {
    for (const item of returnOrder.items) {
      const product = await Product.findById(item.product);
      product.stock += item.quantity;
      await product.save();
    }
    returnOrder.refundStatus = 'completed';
  }

  const updatedReturn = await returnOrder.save();
  res.json(updatedReturn);
});

// @desc    Confirm product received (admin)
// @route   PUT /api/returns/:id/received
// @access  Private/Admin
const confirmProductReceived = asyncHandler(async (req, res) => {
  const returnOrder = await ReturnOrder.findById(req.params.id);

  if (!returnOrder) {
    res.status(404);
    throw new Error('Return order not found');
  }

  returnOrder.productReceived = true;
  const updatedReturn = await returnOrder.save();
  res.json(updatedReturn);
});

// @desc    Get all return orders (admin)
// @route   GET /api/returns
// @access  Private/Admin
const getAllReturns = asyncHandler(async (req, res) => {
  const returns = await ReturnOrder.find({})
    .populate('user', 'name company')
    .populate('order')
    .populate('items.product', 'name')
    .sort('-createdAt');

  res.json(returns);
});

// @desc    Get agent's return orders
// @route   GET /api/returns/myreturns
// @access  Private/Agent
const getMyReturns = asyncHandler(async (req, res) => {
  const returns = await ReturnOrder.find({ user: req.user._id })
    .populate('order')
    .populate('items.product', 'name')
    .sort('-createdAt');

  res.json(returns);
});

export {
  createReturnOrder,
  updateReturnStatus,
  confirmProductReceived,
  getAllReturns,
  getMyReturns
};