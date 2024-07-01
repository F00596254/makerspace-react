import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Add Privilege", src: "AddPrivilege", path: "/add-privilege" },
    { title: "View Privileges", src: "ViewPrivilege", path: "/view-privilege" },
    { title: "Link Role to Privilege", src: "LinkRolePrivilege", gap: true, path: "/link-role-privilege" },
    { title: "View Roles", src: "ViewRoles", path: "/view-roles" },
    { title: "Add Role", src: "AddRole", path: "/add-role" }
  ];
  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20 "} bg-black h-screen p-5 pt-8 relative duration-300`}>
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/smiley.svg"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            AdeCodes
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
            >
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
