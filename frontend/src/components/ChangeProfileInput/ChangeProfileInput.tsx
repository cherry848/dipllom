import c from "classnames";
import s from "./ChangeProfileInput.module.css";
interface ChangeProfileInputProps {
  type: "name" | "password";
  value?: string;
  onValueChange?: (value: string) => void;
  changeable: boolean;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

export const ChangeProfileInput = ({
  type,
  value,
  onValueChange,
  changeable,
  onClick,
  onChange,
}: ChangeProfileInputProps) => {
  return (
    <div className={s.authForm}>
      <label className={s.label} htmlFor="input">
        {type === "name" ? "Поменять имя" : "Поменять пароль"}
      </label>
      <input
        placeholder={type === "password" ? "Текущий пароль" : value}
        className={c(s.input, {
          [s.wrong]: !changeable,
        })}
        type="password"
        id="input"
        onClick={onClick}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {type === "password" && (
        <input
          placeholder="Новый пароль"
          className={s.input}
          type="password"
          id="input"
          onChange={(e) => onValueChange?.(e.target.value)}
        />
      )}
    </div>
  );
};
