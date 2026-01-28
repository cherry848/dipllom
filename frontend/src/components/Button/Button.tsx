import s from "./Button.module.css";

interface ButtonProps {
  auth: "login" | "register";
}

export const Button = ({ auth }: ButtonProps) => {
  return (
    <button className={s.button}>
      {auth === "login" ? "Войти" : "Зарегистрироваться"}
    </button>
  );
};
