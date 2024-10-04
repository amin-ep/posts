/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";

function HomeLink({ extraStyles }) {
  return (
    <Link
      to="/home"
      className={`${extraStyles} text-white hover:text-stone-900 fixed top-3 left-3`}
    >
      <HiHome size={40} />
    </Link>
  );
}

export default HomeLink;
