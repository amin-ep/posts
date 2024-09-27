/* eslint-disable react/prop-types */
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
function EyeButton({ onClick, isShown, extraStyles }) {
  return (
    <button
      type="button"
      className={`absolute ${extraStyles}`}
      onClick={onClick}
    >
      {isShown ? <IoEyeOffOutline size={25} /> : <IoEyeOutline size={25} />}
    </button>
  );
}

export default EyeButton;
