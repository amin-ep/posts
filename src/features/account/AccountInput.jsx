/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../ui/Input";
import { HiOutlinePencil, HiXMark } from "react-icons/hi2";

function AccountInput({
  type,
  id,
  hasError,
  onChange,
  onBlur,
  placeholder,
  value,
  name,
  labelValue,
  label,
  defaultValue,
}) {
  const [openInput, setOpenInput] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:px-10 md:px-20 lg:px-40  sm:items-center w-full text-gray-800">
      <label
        className="text-base md:text-lg text-stone-9000 font-semibold"
        onClick={() => setOpenInput(true)}
      >
        {label}
      </label>
      <div className="flex items-center h-10 justify-between gap-6">
        {openInput ? (
          <Input
            id={id}
            hasError={hasError}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            value={value}
            defaultValue={defaultValue}
          />
        ) : (
          <p className="text-md">{labelValue}</p>
        )}
        <button
          onClick={() => setOpenInput((input) => !input)}
          type="button"
          className="text-xl"
        >
          {openInput ? <HiXMark /> : <HiOutlinePencil />}
        </button>
      </div>
    </div>
  );
}

export default AccountInput;
