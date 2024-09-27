/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Input from "../../ui/Input";
function ChangePasswordInput({
  type,
  value,
  onChange,
  onBlur,
  id,
  hasError,
  name,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        hasError={hasError}
      />
      <button
        type="button"
        onClick={() => setShowPassword((s) => !s)}
        className="absolute right-3 top-3 text-3xl"
      >
        {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
      </button>
    </div>
  );
}

export default ChangePasswordInput;
