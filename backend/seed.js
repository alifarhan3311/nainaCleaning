require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    const existingSuperadmin = await Admin.findOne({ role: 'superadmin' });
    if (existingSuperadmin) {
      console.log('ℹ️  Superadmin already exists, skipping seed.');
      return;
    }

    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'superadmin',
    });

    console.log('✅ Superadmin seeded successfully!');
    console.log(`   Email: ${admin.email}`);
    console.log('   Password: Admin@123');
    console.log('   ⚠️  Please change these credentials after first login!');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  }
};

// Allow standalone execution: node seed.js
if (require.main === module) {
  const connectDB = require('./config/db');
  connectDB().then(async () => {
    await seedAdmin();
    await mongoose.disconnect();
    process.exit(0);
  });
}

module.exports = seedAdmin;
