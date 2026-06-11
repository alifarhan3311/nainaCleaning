import React from 'react';

const Section = ({ children, className = '', padding = true }) => {
  return (
    <section className={`${padding ? 'py-16 md:py-24' : ''} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section;
