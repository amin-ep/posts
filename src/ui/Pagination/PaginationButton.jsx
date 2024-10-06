/* eslint-disable react/prop-types */
function PaginationButton({ children, onClick, active, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full w-[45px] h-[45px] flex items-center justify-center text-base font-semibold ${
        active ? "bg-indigo-800 text-white" : "bg-white text-indigo-800"
      } shadow-lg shadow-black/30 transition hover:bg-indigo-800 hover:text-white disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
