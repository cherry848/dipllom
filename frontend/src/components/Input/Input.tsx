import s from "./Input.module.css";

interface InputProps {
  type: "email" | "password";
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Input = ({ type, value, onValueChange }: InputProps) => {
  return (
    <div className={s.authForm}>
      <label className={s.label} htmlFor="input">
        {type === "email" ? "Email" : "Password"}
      </label>
      <input
        value={value}
        placeholder={
          type === "email" ? "Введите ваш email" : "Введите ваш пароль"
        }
        className={s.input}
        type="text"
        id="input"
        onChange={(e) => onValueChange?.(e.target.value)}
      />
    </div>
  );
};
