import c from "classnames";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import s from "./AuthModal.module.css";
import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/api";
import { Form } from "../shared/Form/Form";

interface AuthModalProps {
  auth: "Войти" | "Зарегистрироваться";
  onClose: () => void;
}

export const AuthModal = ({ auth, onClose }: AuthModalProps) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [data, setData] = useState({ email: "", password: "" });

  const handleAuth = () => {
    if (auth === "Войти") {
      login(data);
    } else {
      register(data);
    }
  };

  return (
    <div className={s.modal}>
      <div className={s.header}>
        {auth === "Войти" ? auth : "Зарегистрироваться"}
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
        onClick={() => {
          handleAuth();
          onClose();
        }}
      >
        {auth}
      </Button>
      <span
        className={c(s.forgotPassword, {
          [s.hidden]: auth === "Зарегистрироваться",
        })}
      >
        Забыли пароль?
      </span>
      <span
        className={c(s.authRedirectLink, {
          [s.loginLink]: auth === "Зарегистрироваться",
        })}
      >
        {auth === "Войти" ? "Создать аккаунт" : "Войти"}
      </span>
    </div>
  );
};
