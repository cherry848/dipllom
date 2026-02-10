import s from "./ChangeProfileInput.module.css"

interface ChangeProfileInputProps {
  type: "name" | "password";
  value?: string;
  onValueChange?: (value: string) => void;
}


export const ChangeProfileInput = ({type, value, onValueChange}: ChangeProfileInputProps) => {
  return (
    <div className={s.authForm}>
      <label className={s.label} htmlFor="input">
        {type === "name" ? "Поменять имя" : "Поменять пароль"}
      </label>
      <input
        placeholder={
          type === "password" ? "Текущий пароль" : value
        }
        className={s.input}
        type="text"
        id="input"
        onChange={(e) => onValueChange?.(e.target.value)}
      />
      {type === "password" && <input
      placeholder="Новый пароль"
      className={s.input}
      type="text"
      id="input"
      onChange={(e) => onValueChange?.(e.target.value)}
      />}
    </div>
  );
};
