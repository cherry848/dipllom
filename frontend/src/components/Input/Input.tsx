import s from "./Input.module.css";

interface InputProps {
  type: "email" | "password";
}

export const Input = ({ type }: InputProps) => {
  return (
    <div className={s.authForm}>
      <label className={s.label} htmlFor="input">
        {type === "email" ? "Email" : "Password"}
      </label>
      <input
        placeholder={
          type === "email" ? "Введите ваш email" : "Введите ваш пароль"
        }
        className={s.input}
        type="text"
        id="input"
      />
    </div>
  );
};
