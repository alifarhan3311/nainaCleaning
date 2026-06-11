const Admin = require('../models/Admin');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private (Superadmin)
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: admins, total: admins.length });
});

// @desc    Create admin
// @route   POST /api/admins
// @access  Private (Superadmin)
const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: 'Username, email, and password are required' });
  }

  const exists = await Admin.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).json({ success: false, error: 'Admin already exists with this email or username' });
  }

  const admin = await Admin.create({
    username,
    email,
    password,
    role: role || 'admin',
  });

  const adminData = await Admin.findById(admin._id).select('-password');
  res.status(201).json({ success: true, data: adminData, message: 'Admin created successfully' });
});

// @desc    Update admin
// @route   PUT /api/admins/:id
// @access  Private (Superadmin)
const updateAdmin = asyncHandler(async (req, res) => {
  const { username, email, role } = req.body;
  const updateData = {};

  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (role && ['admin', 'superadmin'].includes(role)) updateData.role = role;

  // Prevent demoting last superadmin
  if (role === 'admin') {
    const targetAdmin = await Admin.findById(req.params.id);
    if (targetAdmin && targetAdmin.role === 'superadmin') {
      const superadminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superadminCount <= 1) {
        return res.status(400).json({ success: false, error: 'Cannot demote the last superadmin account' });
      }
    }
  }

  const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!admin) {
    return res.status(404).json({ success: false, error: 'Admin not found' });
  }

  res.status(200).json({ success: true, data: admin, message: 'Admin updated successfully' });
});

// @desc    Delete admin
// @route   DELETE /api/admins/:id
// @access  Private (Superadmin)
const deleteAdmin = asyncHandler(async (req, res) => {
  const adminToDelete = await Admin.findById(req.params.id);

  if (!adminToDelete) {
    return res.status(404).json({ success: false, error: 'Admin not found' });
  }

  // Prevent self-deletion
  if (adminToDelete._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ success: false, error: 'You cannot delete your own account' });
  }

  // Prevent deleting the last superadmin
  if (adminToDelete.role === 'superadmin') {
    const superadminCount = await Admin.countDocuments({ role: 'superadmin' });
    if (superadminCount <= 1) {
      return res.status(400).json({ success: false, error: 'Cannot delete the last superadmin account' });
    }
  }

  await Admin.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'Admin deleted successfully' });
});

module.exports = { getAdmins, createAdmin, updateAdmin, deleteAdmin };
