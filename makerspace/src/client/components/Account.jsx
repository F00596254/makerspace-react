import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn } from "../store/atoms/isLoggedIn";
import axios from "axios";
import { setIsAdmin } from "../store/actions";

export default function Account() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isloggedin = useRecoilValue(isLoggedIn);
  const setisloggedin = useSetRecoilState(isLoggedIn);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Adjust the delay time as needed
  };

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("token");
      dispatch(setIsAdmin(false));
      setisloggedin(false);
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // console.log(isloggedin + " from Account jsx ");
  if (!isloggedin) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
          Account
        </button>

        {/* <!-- Dropdown menu --> */}
        {isOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow w-44">
            <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
              <Link to={"/signup"}> REGISTER </Link>
            </button>
            <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
              <Link to={"/signin"}> LOG IN </Link>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
          Account
        </button>

        {/* <!-- Dropdown menu --> */}
        {isOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow w-44">
            <button className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100">
              <Link to={"/accountdetails"}> Account details </Link>
            </button>
            <button
              onClick={handleLogOut}
              className="block w-full text-left text-md font-bold px-4 py-2 hover:bg-gray-100"
            >
              <Link to={"/signin"}> LOG OUT </Link>
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
