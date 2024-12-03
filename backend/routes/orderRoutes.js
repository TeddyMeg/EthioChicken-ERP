import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  confirmOrder,
  denyOrder,
  updateShipmentDetails,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getAllOrders)
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

  router.route('/:id/confirm')
  .put(protect, admin, confirmOrder);

router.route('/:id/deny')
  .put(protect, admin, denyOrder);

router.route('/:id/shipment')
  .put(protect, admin, updateShipmentDetails);

export default router;