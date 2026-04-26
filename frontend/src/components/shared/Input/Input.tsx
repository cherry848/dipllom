import cn from "classnames";
import s from "./Input.module.css";
import type { ReactNode } from "react";

type ClassNames = Partial<{
  container: string;
  inputWrapper: string;
  input: string;
}>;

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
  label?: string;
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
  label,
}: InputProps) => {
  return (
    <label className={cn(s.container, error && s.error, classNames?.container)}>
      {!!label && <div className={s.label}>{label}</div>}

      <div className={cn(s.input_wrapper, classNames?.inputWrapper)}>
        {!!icon && <div className={s.icon}>{icon}</div>}

        <input
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          className={cn(s.input, classNames?.input)}
          type={type}
          id={id}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </label>
  );
};
