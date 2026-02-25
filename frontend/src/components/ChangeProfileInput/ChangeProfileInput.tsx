import c from "classnames";
import s from "./ChangeProfileInput.module.css";
interface ChangeProfileInputProps {
  type: "name" | "password";
  placeholder?: string;
  onValueChange?: (value: string) => void;
  changeable: boolean;
  onClick?: () => void;
  onChange?: (value: string) => void;
  error?: string;
  value: string;
  currentValue?: string;
}

export const ChangeProfileInput = ({
  type,
  placeholder,
  onValueChange,
  changeable,
  onClick,
  onChange,
  error,
  value,
  currentValue,
}: ChangeProfileInputProps) => {
  return (
    <div className={s.authForm}>
      <label className={s.label} htmlFor="input">
        <span>{type === "name" ? "Поменять имя" : "Поменять пароль"}</span>
        {error && <span className={s.error}>{error}</span>}
      </label>
      <input
        placeholder={type === "password" ? "Текущий пароль" : placeholder}
        className={c(s.input, {
          [s.wrong]: !changeable,
        })}
        type={type === "password" ? "password" : "text"}
        id="input"
        onClick={onClick}
        onChange={(e) => onChange?.(e.target.value)}
        value={type === "password" ? currentValue : value}
      />
      {type === "password" && (
        <input
          placeholder="Новый пароль"
          className={s.input}
          type="password"
          id="input"
          onChange={(e) => onValueChange?.(e.target.value)}
          value={value}
        />
      )}
    </div>
  );
};
