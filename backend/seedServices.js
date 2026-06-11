require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const seedServices = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Create services
    const services = [
      {
        title: 'Residential Cleaning',
        description: 'Professional home cleaning services for houses, apartments, and condos. We ensure your living space is spotless and comfortable.',
        icon: '🏠',
        features: [
          'Deep cleaning',
          'Regular maintenance',
          'Move-in/move-out cleaning',
          'Apartment cleaning',
          'House cleaning'
        ],
        priceRange: '$50 - $200',
        isActive: true,
        order: 1,
      },
      {
        title: 'Commercial Cleaning',
        description: 'Comprehensive cleaning solutions for offices, retail spaces, and commercial properties. Maintain a professional environment for your business.',
        icon: '🏢',
        features: [
          'Office cleaning',
          'Retail space cleaning',
          'Janitorial services',
          'Post-construction cleaning',
          'Floor maintenance'
        ],
        priceRange: '$100 - $500',
        isActive: true,
        order: 2,
      },
    ];

    const createdServices = await Service.create(services);
    console.log('Services created successfully:');
    createdServices.forEach(service => {
      console.log(`- ${service.title}`);
    });

    console.log('\nServices seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
