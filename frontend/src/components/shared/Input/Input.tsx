import c from "classnames";
import s from "./Input.module.css";
import type { ReactNode } from "react";

type ClassNames = {
  container?: string;
  input: string;
};

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onClick?: () => void;
  error?: boolean;
  id?: string;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  classNames?: ClassNames;
  icon?: ReactNode;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  onClick,
  error,
  id,
  type = "text",
  onFocus,
  onBlur,
  classNames,
  icon,
}: InputProps) => {
  return (
    <label className={c(s.container, classNames?.container)}>
      {!!icon && <div className={s.icon}>{icon}</div>}

      <input
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={c(s.input, classNames?.input, {
          [s.wrong]: error,
        })}
        type={type}
        id={id}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
};
