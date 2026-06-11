const Service = require('../models/Service');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all services (public, with filters)
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10, active } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (active !== undefined && active !== '') {
    query.isActive = active === 'true';
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [services, total] = await Promise.all([
    Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Service.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      services,
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

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
  res.status(200).json({ success: true, data: service });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private (Admin)
const createService = asyncHandler(async (req, res) => {
  const { title, description, icon, image, features, priceRange, order, isActive } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }

  const service = await Service.create({
    title,
    description,
    icon: icon || '🏢',
    image: image || '',
    features: Array.isArray(features) ? features : [],
    priceRange: priceRange || '',
    order: order !== undefined ? order : 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  res.status(201).json({ success: true, data: service, message: 'Service created successfully' });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.status(200).json({ success: true, data: service, message: 'Service updated successfully' });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
  res.status(200).json({ success: true, message: 'Service deleted successfully' });
});

// @desc    Toggle service active status
// @route   PATCH /api/services/:id/toggle
// @access  Private (Admin)
const toggleService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
  service.isActive = !service.isActive;
  await service.save();
  res.status(200).json({
    success: true,
    data: service,
    message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
  });
});

module.exports = { getServices, getService, createService, updateService, deleteService, toggleService };
