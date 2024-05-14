import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Account(){
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Adjust the delay time as needed
  };

  

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Account
      </button>
      
      {/* <!-- Dropdown menu --> */}
      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg shadow w-44">
          <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
          <Link to={"/signup"}>REGISTER </Link>
          </button>
          <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
            <Link to={"/signin"}>LOG IN </Link> 
          </button>
        </div>
      )}
    </div>
  );
  
}