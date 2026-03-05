import type { ReactNode } from "react";
import s from "./Form.module.css";
interface FormProps {
  children: ReactNode;
  label?: string;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Form = ({
  children,
  label,
  error,
  onFocus,
  onBlur,
}: FormProps) => {
  return (
    <form onFocus={onFocus} onBlur={onBlur} className={s.form} action="">
      {label && (
        <label className={s.label} htmlFor={label}>
          <span>{label}</span>
          {error && <span className={s.error}>{error}</span>}
        </label>
      )}
      {children}
    </form>
  );
};
