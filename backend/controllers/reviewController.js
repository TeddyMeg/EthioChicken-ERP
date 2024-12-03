import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private/Agent
const createReview = asyncHandler(async (req, res) => {
  const { product, rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    product,
    rating,
    comment
  });

  res.status(201).json(review);
});

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:id
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id })
    .populate('user', 'name company')
    .sort('-createdAt');

  res.json(reviews);
});

// @desc    Get all reviews (admin)
// @route   GET /api/reviews
// @access  Private/Admin
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name company')
    .populate('product', 'name')
    .sort('-createdAt');

  res.json(reviews);
});

export { createReview, getProductReviews, getAllReviews };