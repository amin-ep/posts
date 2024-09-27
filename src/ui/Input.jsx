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
          ? `bg-red-300 text-stone-900 placeholder:text-stone-700`
          : `bg-white/80`
      } px-5 py-3 rounded-full w-full outline-none transition-all duration-500 focus:bg-white focus:shadow-2xl focus:shadow-black/85 ${extraStyles}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}

export default Input;
