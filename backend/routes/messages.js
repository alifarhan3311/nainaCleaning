const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const { messageLimiter } = require('../middleware/rateLimit');

// Public route (contact form with rate limit)
router.post('/', messageLimiter, createMessage);

// Protected routes
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.patch('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
