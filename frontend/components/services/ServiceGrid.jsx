import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceGrid = ({ services, loading, onViewService }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          onView={onViewService}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;
