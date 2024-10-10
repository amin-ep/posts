/* eslint-disable react/prop-types */
function Input({
  type,
  value,
  onChange,
  onBlur,
  id,
  hasError,
  name,
  extraStyles,
  placeholder,
  defaultValue,
  inputMode = "text",
}) {
  return (
    <input
      autoComplete="off"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`${
        hasError
          ? `bg-red-300 border-red-500 text-stone-900 placeholder:text-stone-700`
          : `bg-white`
      } px-5 py-3 rounded-md w-full outline-none border-2  focus:border-indigo-700 border-gray-300 transition-all duration-500 ${extraStyles}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
      inputMode={inputMode}
    />
  );
}

export default Input;
