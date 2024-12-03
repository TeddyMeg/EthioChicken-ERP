import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email company');
  res.json(orders);
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, deliveryDate } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Calculate total price and validate stock
  let totalPrice = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product._id);
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.product._id} not found`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    totalPrice += product.price * item.quantity;
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    deliveryDate,
  });

  // Update product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product._id);
    product.stock -= item.quantity;
    await product.save();
  }

  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderItems = req.body.orderItems || order.orderItems;
    order.shippingAddress = req.body.shippingAddress || order.shippingAddress;
    order.totalPrice = req.body.totalPrice || order.totalPrice;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('orderItems.product', 'name price');
  res.json(orders);
});

// @desc    Confirm order (admin)
// @route   PUT /api/orders/:id/confirm
// @access  Private/Admin
const confirmOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.status === 'pending') {
      order.status = 'confirmed';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Order is not in pending state');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Deny order (admin)
// @route   PUT /api/orders/:id/deny
// @access  Private/Admin
const denyOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.status === 'pending') {
      order.status = 'denied';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Order is not in pending state');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update shipment details (admin)
// @route   PATCH /api/orders/:id/shipment
// @access  Private/Admin
const updateShipmentDetails = asyncHandler(async (req, res) => {
  const { trackingNumber, carrier } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.status === 'confirmed' || order.status === 'shipped') {
      order.status = 'shipped'; // Update status to shipped if it was confirmed
      order.shippingDetails = { trackingNumber, carrier };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Order is not in a shippable state');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


export { 
  getAllOrders,
  createOrder, 
  getOrderById, 
  updateOrder,
  deleteOrder,
  updateOrderStatus, 
  getMyOrders, 
  confirmOrder,
  denyOrder,
  updateShipmentDetails,
};