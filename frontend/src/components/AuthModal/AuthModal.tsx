import c from "classnames";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import s from "./AuthModal.module.css";
import { useLoginMutation, useRegisterMutation } from "../../redux/api";
import { Form } from "../shared/Form/Form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { changeType, setData, toggle } from "../../redux/slices/modal.slice";

export const AuthModal = () => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const modal = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const handleAuth = () => {
    if (modal.type === "Войти") {
      login({ email: modal.email, password: modal.password });
    } else {
      register({ email: modal.email, password: modal.password });
    }
  };

  return (
    <div className={s.modal}>
      <div className={s.header}>
        {modal.type === "Войти" ? "Войти" : "Зарегистрироваться"}
        <img
          onClick={() => {
            dispatch(toggle());
          }}
          src="/close-button.svg"
          alt="close button"
          className={s.img}
        />
      </div>
      <div className={s.authContainer}>
        <Form label="Email">
          <Input
            placeholder="Введите ваш email"
            value={modal.email}
            onChange={(email) => {
              dispatch(setData({ ...modal, email }));
            }}
          />
        </Form>
        <Form label="Пароль">
          <Input
            placeholder="Введите ваш пароль"
            value={modal.password}
            onChange={(password) => dispatch(setData({ ...modal, password }))}
          />
        </Form>
      </div>
      <Button
        className={s.button}
        onClick={() => {
          handleAuth();
          dispatch(toggle());
        }}
      >
        {modal.type}
      </Button>
      <span
        className={c(s.forgotPassword, {
          [s.hidden]: modal.type === "Зарегистрироваться",
        })}
      >
        Забыли пароль?
      </span>
      <span
        className={c(s.authRedirectLink, {
          [s.loginLink]: modal.type === "Зарегистрироваться",
        })}
        onClick={() => {
          dispatch(changeType());
        }}
      >
        {modal.type === "Войти" ? "Создать аккаунт" : "Войти"}
      </span>
    </div>
  );
};
