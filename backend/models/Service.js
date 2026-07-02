const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  icon: {
    type: String,
    default: '🏢',
  },
  image: {
    type: String,
    default: '',
  },
  features: {
    type: [String],
    default: [],
  },
  priceRange: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  // Additional fields for frontend service cards
  color: {
    type: String,
    default: '#1e3a5f',
  },
  iconColor: {
    type: String,
    default: '#60a5fa',
  },
  tagline: {
    type: String,
    default: '',
  },
  ideal: {
    type: String,
    default: '',
  },
  freq: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['residential', 'commercial'],
    required: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance
serviceSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);