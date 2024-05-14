// HeroSection.js
import React from 'react';

const Title = () => {
  return (
    <section className="bg-white py-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="border border-gray-200 rounded p-6">
          <h2 className="text-xl font-bold mb-4">Title</h2>
          <p>Welcome to Corcordia University Wisconsin, consectetur adipiscing elit. Nulla commodo justo id enim aliquet vestibulum.</p>
        </div>
        {/* Add more testimonial cards here */}
      </div>
    </div>
  </section>
  );
};

export default Title;
