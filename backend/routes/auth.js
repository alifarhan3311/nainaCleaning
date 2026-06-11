const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/register', protect, register);
router.post('/verify', protect, verifyToken);
router.post('/logout', protect, logout);
router.post('/change-password', protect, changePassword);

module.exports = router;
