import c from "classnames";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./AuthModal.module.css";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useState } from "react";
import { login } from "../../redux/slices/user.slice";

interface AuthModalProps {
  auth: "login" | "register";
  onClose: () => void;
}

export const AuthModal = ({ auth, onClose }: AuthModalProps) => {
  const [data, setData] = useState({ email: "", password: "" });

  const dispatch = useAppDispatch();

  const handleAuth = () => {
    if (auth === "login") {
      dispatch(login(data));
    } else {
      // dispatch(register(data));
    }
  };

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
        <Input
          type="email"
          value={data.email}
          onValueChange={(email) => setData({ ...data, email })}
        />
        <Input
          type="password"
          value={data.password}
          onValueChange={(password) => setData({ ...data, password })}
        />
      </div>
      <Button auth={auth} onClick={handleAuth} />
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
