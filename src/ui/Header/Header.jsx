/* eslint-disable react/prop-types */
import { HiBars3BottomLeft } from "react-icons/hi2";
import HeaderNav from "./HeaderNav";

function Header({ setOpenSidebar }) {
  return (
    <header className="bg-white flex items-center justify-between p-4 border-b-gray-100">
      <button className="text-3xl" onClick={() => setOpenSidebar((s) => !s)}>
        <HiBars3BottomLeft />
      </button>
      <HeaderNav />
    </header>
  );
}

export default Header;
