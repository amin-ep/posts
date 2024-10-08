/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkButton({
  to,
  width = "full",
  type,
  background = "dark",
  onClick,
  children,
  disabled,
}) {
  const styles = {
    dark:
      "btn " +
      "bg-stone-800 hover:bg-stone-700 text-white focus:ring-stone-800",
    white:
      "btn " +
      "bg-white hover:bg-gray-100 text-stone-900 focus:ring-white hover:text-indigo-800",
    indigo:
      "btn " +
      "bg-indigo-800 hover:bg-indigo-900 text-gray-50 focus:ring-indigo-600",
    red: "btn " + "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
  };

  if (to)
    return (
      <Link to={to} className={styles[background]}>
        {children}
      </Link>
    );
  else
    return (
      <button
        className={`${styles[background]} w-[${width}]`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
}

export default LinkButton;
