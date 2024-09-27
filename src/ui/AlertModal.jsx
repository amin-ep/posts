/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import LinkButton from "./LinkButton";

ReactModal.setAppElement("#alert");

function AlertModal({ title, description, onDelete, onClose, isOpen }) {
  const styles = {
    content: {
      background: "#ffffff",
      zIndex: 1001,
      width: "25rem",
      height: "20rem",
      padding: 0,
      display: "flex",
      border: "none",
      flexDirection: "column",
      boxShadow: "0 12px 4px rgba(0, 0, 0, 0.2)",
      maxWidth: "100%",
      left: "40%",
      top: "20%",
    },
    overlay: {
      background: "transparent",
      zIndex: 1000,
    },
  };

  return (
    <ReactModal style={styles} isOpen={isOpen}>
      <header className="bg-red-600 p-4 text-center">
        <h1 className="text-white text-2xl">{title}</h1>
      </header>
      <div className="grow flex items-center text-center justify-center">
        <p className="p-2 text-xl">{description}</p>
      </div>
      <div className="flex justify-between items-center p-3 gap-3">
        <LinkButton
          type="button"
          onClick={onDelete}
          background="red"
          width="50%"
        >
          Delete
        </LinkButton>
        <LinkButton
          type="button"
          background="teal"
          onClick={onClose}
          width="50%"
        >
          Refuse
        </LinkButton>
      </div>
    </ReactModal>
  );
}

export default AlertModal;
