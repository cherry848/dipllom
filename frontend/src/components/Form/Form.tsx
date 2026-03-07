import type { FormEvent, ReactNode } from "react";
import s from "./Form.module.css";
interface FormProps {
  children: ReactNode;
  label?: string;
  error?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, label, error, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={s.form} action="">
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
