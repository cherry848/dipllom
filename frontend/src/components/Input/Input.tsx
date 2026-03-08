import c from "classnames";
import s from "./Input.module.css";

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  onClick?: () => void;
  error?: boolean;
  id?: string;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
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
}: InputProps) => {
  return (
    <div className={s.authForm}>
      <input
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={c(s.input, {
          [s.wrong]: error,
        })}
        type={type}
        id={id}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
