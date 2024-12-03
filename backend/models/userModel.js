import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: function() { return this.role === 'admin'; }
  },
  department: {
    type: String,
    required: function() { return this.role === 'admin'; }
  }
});

const agentSchema = new mongoose.Schema({
  company: {
    type: String,
    required: function() { return this.role === 'agent'; }
  },
  address: {
    street: String,
    city: String,
    region: String,
    country: { type: String, default: 'Ethiopia' }
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['agent', 'admin'],
    default: 'agent'
  },
  phone: {
    type: String,
    required: true
  },
  adminDetails: adminSchema,
  agentDetails: agentSchema,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;