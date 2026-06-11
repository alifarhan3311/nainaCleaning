const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('../middleware/asyncHandler');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

// @desc    Register admin user
// @route   POST /api/auth/register
// @access  Private
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: 'Username, email, and password are required' });
  }

  const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
  if (adminExists) {
    return res.status(400).json({ success: false, error: 'Admin already exists with this email or username' });
  }

  const admin = await Admin.create({ username, email, password, role: role || 'admin' });
  const token = generateToken(admin._id);

  res.status(201).json({
    success: true,
    data: {
      user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
      token,
    },
    message: 'Admin created successfully',
  });
});

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide email and password' });
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const token = generateToken(admin._id);

  res.status(200).json({
    success: true,
    data: {
      user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
      token,
    },
    message: 'Login successful',
  });
});

// @desc    Verify token
// @route   POST /api/auth/verify
// @access  Private
const verifyToken = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id).select('-password');
  if (!admin) {
    return res.status(401).json({ success: false, error: 'User not found' });
  }
  res.status(200).json({
    success: true,
    data: {
      valid: true,
      user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
    },
  });
});

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Logout successful' });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Please provide your email address' });
  }
  // Security: don't reveal if email exists
  await Admin.findOne({ email });
  res.status(200).json({
    success: true,
    message: 'If an account with that email exists, reset instructions have been sent.',
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ success: false, error: 'Reset token and new password are required' });
  }
  res.status(200).json({
    success: true,
    message: 'Password has been reset successfully. Please login with your new password.',
  });
});

// @desc    Change password (authenticated)
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Current password and new password are required' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, error: 'New password must be at least 8 characters' });
  }

  const admin = await Admin.findById(req.user._id).select('+password');
  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({ success: false, error: 'Current password is incorrect' });
  }

  admin.password = newPassword;
  await admin.save();

  res.status(200).json({ success: true, message: 'Password changed successfully' });
});

module.exports = { register, login, verifyToken, logout, forgotPassword, resetPassword, changePassword };
