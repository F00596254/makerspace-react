// Layout.js

import React from 'react';
import NavigationBar from './NavigationBar'; // Assuming the component file is in the same directory

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
