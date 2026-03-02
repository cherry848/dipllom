import c from "classnames";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./AuthModal.module.css";
import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/api";
import { Form } from "../Form/Form";

interface AuthModalProps {
  auth: "login" | "register";
  onClose: () => void;
}

export const AuthModal = ({ auth, onClose }: AuthModalProps) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [data, setData] = useState({ email: "", password: "" });

  const handleAuth = () => {
    if (auth === "login") {
      login(data);
    } else {
      register(data);
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
        <Form label="Email">
          <Input
            placeholder="Введите ваш email"
            value={data.email}
            onChange={(email) => setData({ ...data, email })}
          />
        </Form>
        <Form label="Пароль">
          <Input
            placeholder="Введите ваш пароль"
            value={data.password}
            onChange={(password) => setData({ ...data, password })}
          />
        </Form>
      </div>
      <Button
        className={s.button}
        auth={auth}
        onClick={() => {
          handleAuth();
          onClose();
        }}
      />
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
