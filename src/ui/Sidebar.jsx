/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import MainNav from "../ui/MainNav/MainNav";
import { HiOutlineXCircle } from "react-icons/hi2";

function Sidebar({ openSidebar, setOpenSidebar }) {
  return (
    <aside
      className={`py-12 px-10 border-r-[1px] border-r-gray-100 absolute top-0 left-0 bottom-0 z-50 gap-12 flex-col ${
        openSidebar ? "flex" : "hidden"
      } w-full md:static md:row-[1/_-1] bg-white md:w-[22rem]`}
    >
      <Link
        to="dashboard"
        className="w-full flex items-center justify-between md:justify-center"
      >
        <img
          src="/public/images/logo-icon-dark.svg"
          alt="Logo"
          className="w-36"
        />
        <button className="md:hidden" onClick={() => setOpenSidebar(false)}>
          <HiOutlineXCircle size={30} />
        </button>
      </Link>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
