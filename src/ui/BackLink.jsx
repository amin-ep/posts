import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

function BackLink() {
  return (
    <Link
      to={-1}
      className="absolute top-5 left-5 text-white hover:scale-125 hover:text-stone-900 transition-all"
    >
      <HiChevronLeft size={32} />
    </Link>
  );
}

export default BackLink;
