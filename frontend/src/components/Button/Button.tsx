import type { ReactNode } from "react";

interface ButtonProps {
  auth?: "login" | "register";
  onClick?: () => void;
  children?: ReactNode;
  className: string;
}

export const Button = ({ auth, onClick, children, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {auth === "login" && "Войти"}
      {auth === "register" && "Зарегистрироваться"}
      {children}
    </button>
  );
};
