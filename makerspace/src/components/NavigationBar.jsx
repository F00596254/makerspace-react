import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
          <img className="h-12 w-auto" src="/logo.png" alt="Logo" />
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/About" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="/Services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="/Contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              <a href="/Account" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Account</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
