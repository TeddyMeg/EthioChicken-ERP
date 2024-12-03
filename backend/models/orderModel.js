import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    street: String,
    city: String,
    region: String,
    country: { type: String, default: 'Ethiopia' }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['CBE_TRANSFER', 'TELEBIRR']
  },
  paymentResult: {
    transactionId: String,
    status: String,
    updateTime: String
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  deliveryDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;