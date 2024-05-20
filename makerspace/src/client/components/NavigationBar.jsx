 
import { Link } from 'react-router-dom';
import Account from './Account';
import { RecoilRoot } from 'recoil';

const NavigationBar = () => {
 
     
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl  px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
          <img className="h-14 w-auto" src="/logo.png" alt="Logo" />
          </div>
          {/* Navigation Links */}

           
          <div className="  md:block">
            <div className="ml-20 flex items-center space-x-4">
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                <Link to={"/home"} >Home</Link></a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                <Link to={"/about"}>About</Link></a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                <Link to={"services"}>Services</Link></a>
              <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                <Link to={"/contact"}>Contact</Link></a> 
              <Account />
          
               
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
