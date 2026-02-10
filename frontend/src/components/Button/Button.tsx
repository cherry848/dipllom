import type { ReactNode } from "react";
import s from "./Button.module.css";

interface ButtonProps {
  auth?: "login" | "register";
  onClick?: () => void;
  children?: ReactNode;
}

export const Button = ({ auth, onClick, children }: ButtonProps) => {
  return (
    <button className={s.button} onClick={onClick}>
      {auth === "login" && "Войти"}
      {auth === "register" && "Зарегистрироваться"}
      {children}
    </button>
  );
};
