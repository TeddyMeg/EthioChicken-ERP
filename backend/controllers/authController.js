import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { validateRegistration, validateLogin } from '../utils/validation.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  
  // Validate request
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  // Find user by email and role
  const user = await User.findOne({ email, role });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email, password, or role combination');
  }
});

// @desc    Register user (admin or agent)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { email, role } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Prepare user data based on role
  let userData = {
    ...req.body,
    role,
  };

  if (role === 'admin') {
    userData.adminDetails = {
      employeeId: req.body.employeeId,
      department: req.body.department
    };
  } else {
    userData.agentDetails = {
      company: req.body.company,
      address: req.body.address
    };
  }

  // Create user
  const user = await User.create(userData);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { loginUser, registerUser };