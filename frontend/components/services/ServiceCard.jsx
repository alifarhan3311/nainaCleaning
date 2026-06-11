import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const ServiceCard = ({ service, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
      
      {service.features && service.features.length > 0 && (
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {service.priceRange && (
        <p className="text-sm font-semibold text-blue-600 mb-4">
          {service.priceRange}
        </p>
      )}
      
      <Button
        variant="outline"
        size="sm"
        icon={ArrowRight}
        onClick={() => onView(service)}
        className="w-full"
      >
        Learn More
      </Button>
    </div>
  );
};

export default ServiceCard;
