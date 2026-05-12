import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { toggle } from "../../../redux/slices/modal.slice";

interface ModalProps {
  show?: boolean;
  children: ReactNode;
}

export const Modal = ({ show, children }: ModalProps) => {
  const dispatch = useAppDispatch();

  if (!show) {
    return null;
  }

  return createPortal(
    <div onClick={() => dispatch(toggle())} className={s.overlay}>
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
