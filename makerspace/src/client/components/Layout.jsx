import React from 'react';
import NavigationBar from './NavigationBar';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
