const Message = require('../models/Message');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all messages (admin)
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const { search, status, page = 1, limit = 10 } = req.query;
  const query = {};

  if (status && status !== 'all') {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { service: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [messages, total] = await Promise.all([
    Message.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Message.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      messages,
      pagination: {
        totalItems: total,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    },
  });
});

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }
  res.status(200).json({ success: true, data: message });
});

// @desc    Create message (public contact form)
// @route   POST /api/messages
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
  }

  const newMessage = await Message.create({ name, email, phone, service, message });

  res.status(201).json({
    success: true,
    data: newMessage,
    message: 'Your message has been sent successfully! We will get back to you shortly.',
  });
});

// @desc    Update message status
// @route   PATCH /api/messages/:id/status
// @access  Private
const updateMessageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['new', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status. Must be: new, read, or replied' });
  }

  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!msg) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }

  res.status(200).json({ success: true, data: msg, message: `Message marked as ${status}` });
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }
  res.status(200).json({ success: true, message: 'Message deleted successfully' });
});

module.exports = { getMessages, getMessage, createMessage, updateMessageStatus, deleteMessage };
