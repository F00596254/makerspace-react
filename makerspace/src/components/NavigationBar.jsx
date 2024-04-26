import React from 'react';
import Account from './Account';

const NavigationBar = () => {
  function slideDown(){
      return<>
       <div id="dropdown" className="mt-44 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" aria-labelledby="dropdownHoverButton">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"  >
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">REGISTER</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LOG IN </a>
                    </li>
                  </ul>
                </div>
                </>
  }
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a className="text-white text-lg font-semibold">Logo</a>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              <Account />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
