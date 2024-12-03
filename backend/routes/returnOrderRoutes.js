import express from 'express';
import {
  createReturnOrder,
  updateReturnStatus,
  confirmProductReceived,
  getAllReturns,
  getMyReturns
} from '../controllers/returnOrderController.js';
import { protect, admin, agent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, agent, createReturnOrder)
  .get(protect, admin, getAllReturns);

router.route('/myreturns')
  .get(protect, agent, getMyReturns);

router.route('/:id/status')
  .put(protect, admin, updateReturnStatus);

router.route('/:id/received')
  .put(protect, admin, confirmProductReceived);

export default router;