/* eslint-disable react/prop-types */
function Textarea({ hasError, value, onChange, onBlur, placeholder }) {
  return (
    <textarea
      placeholder={placeholder}
      className={`${
        hasError
          ? `bg-red-300 border-red-500 placeholder:text-indigo-700`
          : `bg-white border-indigo-200`
      } px-5 py-3 border-2 rounded-3xl w-full text-indigo-800 h-60 outline-none transition-all resize-y duration-500 focus:border-indigo-600`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    ></textarea>
  );
}

export default Textarea;
