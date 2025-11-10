import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalPortal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalPortal;
