import c from "classnames";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import s from "./AuthModal.module.css";
import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/api";
import { Form } from "../shared/Form/Form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setData, toggle } from "../../redux/slices/user.slice";

interface AuthModalProps {
  auth: "Войти" | "Зарегистрироваться";
  onToggle: () => void;
  onChange: () => void;
}

export const AuthModal = ({ auth, onToggle, onChange }: AuthModalProps) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [data, setDfata] = useState({ email: "", password: "" });

  const modalData = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const handleAuth = () => {
    if (auth === "Войти") {
      login({ email: modalData.email, password: modalData.password });
    } else {
      register({ email: modalData.email, password: modalData.password });
    }
  };

  return (
    <div className={s.modal}>
      <div className={s.header}>
        {auth === "Войти" ? auth : "Зарегистрироваться"}
        <img
          onClick={() => toggle()}
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
            onChange={(email) => {
              dispatch(setData({ ...modalData, email }));
            }}
          />
        </Form>
        <Form label="Пароль">
          <Input
            placeholder="Введите ваш пароль"
            value={data.password}
            onChange={(password) => dispatch({ ...modalData, password })}
          />
        </Form>
      </div>
      <Button
        className={s.button}
        onClick={() => {
          handleAuth();
          onToggle();
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
