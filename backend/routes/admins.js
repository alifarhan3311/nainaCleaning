const express = require('express');
const router = express.Router();
const { getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

// All routes require authentication and superadmin role
router.get('/', protect, requireRole('superadmin'), getAdmins);
router.post('/', protect, requireRole('superadmin'), createAdmin);
router.put('/:id', protect, requireRole('superadmin'), updateAdmin);
router.delete('/:id', protect, requireRole('superadmin'), deleteAdmin);

module.exports = router;
