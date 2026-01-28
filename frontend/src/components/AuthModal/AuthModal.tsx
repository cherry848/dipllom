import c from "classnames";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./AuthModal.module.css";

interface AuthModalProps {
  auth: "login" | "register";
  onClose: () => void;
}

export const AuthModal = ({ auth, onClose }: AuthModalProps) => {
  return (
    <div className={s.modal}>
      <div className={s.header}>
        {auth === "login" ? "Войти" : "Зарегистрироваться"}
        <img
          onClick={onClose}
          src="/close-button.svg"
          alt="close button"
          className={s.img}
        />
      </div>
      <div className={s.authContainer}>
        <Input type="email" />
        <Input type="password" />
      </div>
      <Button auth={auth} />
      <span
        className={c(s.forgotPassword, {
          [s.hidden]: auth === "register",
        })}
      >
        Забыли пароль?
      </span>
      <span
        className={c(s.authRedirectLink, {
          [s.loginLink]: auth === "register",
        })}
      >
        {auth === "login" ? "Создать аккаунт" : "Войти"}
      </span>
    </div>
  );
};
