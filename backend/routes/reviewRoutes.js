import express from 'express';
import {
  createReview,
  getProductReviews,
  getAllReviews
} from '../controllers/reviewController.js';
import { protect, admin, agent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, agent, createReview)
  .get(protect, admin, getAllReviews);

router.route('/product/:id')
  .get(getProductReviews);

export default router;