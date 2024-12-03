import mongoose from 'mongoose';

const returnOrderSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reason: {
    type: String,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  deliveryMethod: {
    type: String,
    enum: ['company_pickup', 'agent_delivery'],
    required: true
  },
  refundStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending'
  },
  adminNotes: String,
  productReceived: {
    type: Boolean,
    default: false
  },
  refundAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const returnOrder = mongoose.model('returnOrder', returnOrderSchema);
export default returnOrder;