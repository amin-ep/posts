/* eslint-disable react/prop-types */
import styles from "./Container.module.css";

function Container({
  children,
  extraClasses,
  size = "large",
  background = "white",
}) {
  return (
    <div
      className={`${
        background === "white"
          ? "bg-white"
          : background === "transparent"
          ? "bg-transparent"
          : ""
      } my-10 mx-auto max-w-full ${extraClasses} ${styles[size]}`}
    >
      {children}
    </div>
  );
}

export default Container;
