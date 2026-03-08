import type { FormEvent, ReactNode } from "react";
import s from "./Form.module.css";
interface FormProps {
  children: ReactNode;
  label?: string;
  error?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Form = ({
  children,
  label,
  error,
  onSubmit,
  onFocus,
  onBlur,
}: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className={s.form}
      action=""
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {label && (
        <label
          className={s.label}
          htmlFor={label}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span>{label}</span>
          {error && <span className={s.error}>{error}</span>}
        </label>
      )}
      {children}
    </form>
  );
};
