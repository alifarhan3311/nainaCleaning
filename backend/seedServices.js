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
        title: 'Standard Home Cleaning',
        description: 'Our standard cleaning covers all the essentials — dusting, vacuuming, mopping, bathroom sanitization, and kitchen cleaning. Perfect for weekly or bi-weekly schedules.',
        icon: 'Home',
        features: [
          'All bedrooms dusted & vacuumed',
          'Bathrooms fully sanitized',
          'Kitchen surfaces & appliance exteriors',
          'Living areas vacuumed & mopped',
          'Trash removal throughout',
          'Window sills & baseboards wiped',
        ],
        priceRange: '',
        isActive: true,
        order: 1,
        color: '#1e3a5f',
        iconColor: '#60a5fa',
        tagline: 'Regular maintenance for a spotless home',
        ideal: 'Families, homeowners, renters',
        freq: 'Weekly / Bi-weekly / Monthly',
        category: 'residential',
      },
      {
        title: 'Deep Home Cleaning',
        description: 'A comprehensive deep clean targeting every corner — inside appliances, behind furniture, grout scrubbing, and detailed sanitization. Ideal for seasonal or first-time cleans.',
        icon: 'Sparkles',
        features: [
          'Inside oven, fridge & microwave',
          'Cabinet interiors wiped down',
          'Grout & tile scrubbing',
          'Behind & under all furniture',
          'Interior windows & tracks cleaned',
          'Full bathroom descaling',
        ],
        priceRange: '',
        isActive: true,
        order: 2,
        color: '#3d2914',
        iconColor: '#fb923c',
        tagline: 'Top-to-bottom intensive clean',
        ideal: 'First-time clients, seasonal refresh',
        freq: 'One-time / Quarterly',
        category: 'residential',
      },
      {
        title: 'Move-In / Move-Out Cleaning',
        description: 'Whether you\'re moving in or out, we leave the property spotless. We handle everything from top to bottom so you get your deposit back or start fresh in a clean space.',
        icon: 'Wind',
        features: [
          'Full interior deep clean',
          'Inside all cabinets & drawers',
          'Appliances cleaned inside & out',
          'Walls spot-cleaned',
          'All floors scrubbed & polished',
          'Garage & storage area swept',
        ],
        priceRange: '',
        isActive: true,
        order: 3,
        color: '#0d3d2d',
        iconColor: '#4ade80',
        tagline: 'Fresh start for every transition',
        ideal: 'Tenants, landlords, property managers',
        freq: 'One-time',
        category: 'residential',
      },
      {
        title: 'Recurring Maid Service',
        description: 'Subscribe to a regular cleaning schedule and never worry about your home again. Same trusted cleaner every visit, tailored to your home\'s specific needs.',
        icon: 'CalendarCheck',
        features: [
          'Dedicated assigned cleaner',
          'Customized cleaning checklist',
          'Priority scheduling',
          'Flexible rescheduling',
          'Progress reports & communication',
          'Discounted recurring rates',
        ],
        priceRange: '',
        isActive: true,
        order: 4,
        color: '#2d1f4d',
        iconColor: '#c084fc',
        tagline: 'Consistent cleanliness, hassle-free',
        ideal: 'Busy professionals, families',
        freq: 'Weekly / Bi-weekly',
        category: 'residential',
      },
      {
        title: 'Office Cleaning',
        description: 'Regular and thorough cleaning to maintain a professional environment. We work around your office hours with minimal disruption — evenings, weekends, or early mornings.',
        icon: 'Building2',
        features: [
          'Workstations & desks sanitized',
          'Common areas vacuumed & mopped',
          'Kitchenette & break room cleaned',
          'Washrooms fully sanitized',
          'Trash & recycling emptied',
          'Reception & lobby maintained',
        ],
        priceRange: '',
        isActive: true,
        order: 5,
        color: '#1e3a5f',
        iconColor: '#60a5fa',
        tagline: 'Professional spaces, professional results',
        ideal: 'Corporate offices, startups, law firms',
        freq: 'Daily / Weekly / Custom',
        category: 'commercial',
      },
      {
        title: 'Janitorial Services',
        description: 'Complete day-porter and janitorial programs for commercial facilities. Our trained staff maintain your building throughout the day — restrooms, common areas, and more.',
        icon: 'Wrench',
        features: [
          'Day porter & after-hours programs',
          'Restroom restocking & sanitization',
          'High-traffic area maintenance',
          'Elevator & lobby upkeep',
          'Waste management',
          'Dedicated account manager',
        ],
        priceRange: '',
        isActive: true,
        order: 6,
        color: '#3d2914',
        iconColor: '#fb923c',
        tagline: 'Full-service facility maintenance',
        ideal: 'Large facilities, malls, schools',
        freq: 'Daily / On-demand',
        category: 'commercial',
      },
      {
        title: 'Post-Construction Cleaning',
        description: 'After renovations or new builds, dust and debris are everywhere. We do a complete clean-up so your space is safe, presentable, and ready for clients or employees.',
        icon: 'Sun',
        features: [
          'Dust removal from all surfaces',
          'Construction debris disposal',
          'Window & frame cleaning',
          'Floor scrubbing & polishing',
          'HVAC vent dusting',
          'Final inspection walkthrough',
        ],
        priceRange: '',
        isActive: true,
        order: 7,
        color: '#0d3d2d',
        iconColor: '#4ade80',
        tagline: 'Ready for occupancy — guaranteed',
        ideal: 'Contractors, developers, businesses',
        freq: 'One-time / Project-based',
        category: 'commercial',
      },
      {
        title: 'Carpet Steam Cleaning',
        description: 'Hot-water extraction deep cleaning removes embedded dirt, allergens, bacteria, and stains. Commercial-grade equipment for superior results — dry in 2–4 hours.',
        icon: 'Wind',
        features: [
          'Pre-treatment of stains & spots',
          'Hot-water extraction process',
          'Deodorizing treatment',
          'Rapid drying (2–4 hrs)',
          'High-traffic lane restoration',
          'Protective coating available',
        ],
        priceRange: '',
        isActive: true,
        order: 8,
        color: '#2d1f4d',
        iconColor: '#c084fc',
        tagline: 'Restore your carpets to like-new condition',
        ideal: 'Hotels, offices, rental properties',
        freq: 'Quarterly / As needed',
        category: 'commercial',
      },
      {
        title: 'Floor Maintenance',
        description: 'Professional floor care including stripping, waxing, hardwood varnishing, tile & grout restoration. We keep your floors gleaming and protected year-round.',
        icon: 'Home',
        features: [
          'Strip & wax VCT/vinyl floors',
          'Hardwood buffing & varnishing',
          'Tile & grout deep cleaning',
          'Marble & stone polishing',
          'Anti-slip coating',
          'Scheduled maintenance programs',
        ],
        priceRange: '',
        isActive: true,
        order: 9,
        color: '#3d3d1a',
        iconColor: '#facc15',
        tagline: 'Strip, wax, and restore any floor type',
        ideal: 'Retail, healthcare, schools',
        freq: 'Monthly / Quarterly',
        category: 'commercial',
      },
      {
        title: 'Window Cleaning',
        description: 'Interior and exterior commercial window cleaning using professional squeegee systems and eco-safe solutions. High-rise and multi-story buildings welcome.',
        icon: 'Sparkles',
        features: [
          'Interior & exterior panes',
          'Frame & sill cleaning',
          'Screen removal & cleaning',
          'High-rise rope access',
          'Storefront glass polishing',
          'Seasonal programs available',
        ],
        priceRange: '',
        isActive: true,
        order: 10,
        color: '#0d3d4d',
        iconColor: '#22d3ee',
        tagline: 'Streak-free inside and out',
        ideal: 'High-rises, storefronts, offices',
        freq: 'Monthly / Bi-annual',
        category: 'commercial',
      },
    ];

    const createdServices = await Service.create(services);
    console.log('Services created successfully:');
    createdServices.forEach(service => {
      console.log(`- ${service.title}`);
    });

    console.log('\\nServices seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();