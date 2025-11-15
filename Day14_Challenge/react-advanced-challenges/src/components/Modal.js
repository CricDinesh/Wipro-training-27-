import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
