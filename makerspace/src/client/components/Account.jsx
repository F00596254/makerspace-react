import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn } from "../store/atoms/isLoggedIn";

export default function Account(){
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isloggedin=useRecoilValue(isLoggedIn)
  const setisloggedin=useSetRecoilState(isLoggedIn)
  
  
    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200); // Adjust the delay time as needed
    };
    
     
    if(!isloggedin){
          return (
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Account
                </button>
                
                {/* <!-- Dropdown menu --> */}
                {isOpen && (
                  <div className="absolute z-10 bg-white rounded-lg shadow w-44">
                    <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
                    <Link to={"/signup"}> REGISTER </Link>
                    </button>
                    <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
                      <Link to={"/signin"}> LOG IN  </Link> 
                    </button>
                  </div>
                )}
              </div>
            );

    }else{
          return (
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Account
              </button>
              
              {/* <!-- Dropdown menu --> */}
              {isOpen && (
                <div className="absolute z-10 bg-white rounded-lg shadow w-44">
                  <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
                  <Link to={"/accountdetails"} > Account details </Link>
                  </button>
                  <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
                  <Link to={"/passwordchange"} >Password change </Link>
                  </button>
                  <button onClick={()=>{
                      localStorage.setItem("token",false);
                      sessionStorage.setItem("token","");
                      setisloggedin(false);
                  }} className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
                    <Link to={"/signin"}> LOG OUT  </Link> 
                  </button>
                </div>
              )}
            </div>
          );
    }
  }



    // return (
    //   <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    //     <button
    //       className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    //     >
    //       Account
    //     </button>
        
    //     {/* <!-- Dropdown menu --> */}
      
    //     {isOpen && (
    //       <div className="absolute z-10 bg-white rounded-lg shadow w-44">
    //         <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
    //         <Link to={""}>ACCOUNT DETAILS </Link>
    //         </button>
    //         <button onClick={()=>{
    //             // setisloggedin(false);
    //             navigate("/signin");
    //         }} className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
    //            LOG OUT  
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // );
 
 
 
//   return (
//     <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <button
//         className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//       >
//         Account
//       </button>
      
//       {/* <!-- Dropdown menu --> */}
//       {isOpen && (
//         <div className="absolute z-10 bg-white rounded-lg shadow w-44">
//           <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100" >
//           <Link to={"/signup"}>REGISTER </Link>
//           </button>
//           <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
//             <Link to={"/signin"}>LOG IN </Link> 
//           </button>
//         </div>
//       )}
//     </div>
//   );
