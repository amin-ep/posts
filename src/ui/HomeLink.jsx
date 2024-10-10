/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";

function HomeLink({ extraStyles, color = "white" }) {
  const linkColor = {
    white: "text-white",
    indigo: "text-indigo-700",
  };
  return (
    <Link
      to="/home"
      className={`${linkColor[color]} fixed top-3 left-3 ${extraStyles}`}
    >
      <HiHome size={40} />
    </Link>
  );
}

export default HomeLink;
