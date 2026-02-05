import s from "./Button.module.css";

interface ButtonProps {
  auth: "login" | "register";
  onClick?: () => void;
}

export const Button = ({ auth, onClick }: ButtonProps) => {
  return (
    <button className={s.button} onClick={onClick}>
      {auth === "login" ? "Войти" : "Зарегистрироваться"}
    </button>
  );
};
