const express = require('express');
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  toggleService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Protected routes
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.patch('/:id/toggle', protect, toggleService);

module.exports = router;
