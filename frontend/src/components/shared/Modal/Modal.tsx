import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

interface ModalProps {
  show?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) {
    return null;
  }

  return createPortal(
    <div onClick={onClose} className={s.overlay}>
      <div
        className={s.modalWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
