/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function NavListItem({ to, children, icon }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${
            isActive ? "text-blue-600 bg-gray-100" : "text-stone-600 bg-gray-0"
          } flex items-center p-4 gap-2 hover:bg-gray-100 rounded-md transition-colors text-lg text-stone-900`
        }
      >
        {icon}
        {children}
      </NavLink>
    </li>
  );
}

export default NavListItem;
