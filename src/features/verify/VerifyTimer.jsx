/* eslint-disable react/prop-types */
function VerifyTimer({ time }) {
  return (
    <span className="text-4xl sm:text-5xl md:text-9xl">00:00:0{time}</span>
  );
}

export default VerifyTimer;
