import c from "classnames";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import s from "./AuthModal.module.css";
import { useLoginMutation, useRegisterMutation } from "../../redux/api";
import { Form } from "../shared/Form/Form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  changeType,
  setData,
  setError,
  toggle,
} from "../../redux/slices/modal.slice";
import type { ChangeType, ErrorResponse } from "./types/AuthModal.types";
import {
  CLEAR_ERRORS,
  emailType,
  passwordType,
} from "./constants/AuthModal.constants";

export const AuthModal = () => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const { email, password, type, error } = useAppSelector(
    (state) => state.modal,
  );

  const isLogin = type === "Войти";

  const dispatch = useAppDispatch();

  const checkValidity = () => {
    if (!email) {
      dispatch(setError({ email: "Пустое поле!" }));
      return false;
    }
    if (!password) {
      dispatch(setError({ password: "Пустое поле!" }));
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    try {
      if (!checkValidity()) return false;

      const authFn = isLogin ? login : register;
      await authFn({ email, password }).unwrap();

      return true;
    } catch (err) {
      const unknownErr = err as ErrorResponse;
      dispatch(setError({ unknownErr: unknownErr.data.message }));
    }
  };

  const handleChange = (changeType: ChangeType, value: string) => {
    dispatch(setData({ [changeType]: value }));
    dispatch(setError(CLEAR_ERRORS));
  };

  const handleSubmit = async () => {
    if (!(await handleAuth())) return;
    dispatch(toggle());
  };

  return (
    <div className={s.modal}>
      <div className={s.header}>
        {isLogin ? "Войти" : "Зарегистрироваться"}
        <img
          onClick={() => {
            dispatch(toggle());
          }}
          src="/close-button.svg"
          alt="close button"
          className={s.img}
        />
      </div>
      {error.unknownErr && (
        <span className={s.unknownErr}>{error.unknownErr}</span>
      )}
      <div className={s.authContainer}>
        <Form error={error?.email} label="Email">
          <Input
            error={!!error?.email}
            placeholder="Введите ваш email"
            value={email}
            onChange={(email) => handleChange(emailType, email)}
          />
        </Form>
        <Form error={error?.password} label="Пароль">
          <Input
            error={!!error?.password}
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(password) => handleChange(passwordType, password)}
          />
        </Form>
      </div>
      <Button className={s.button} onClick={handleSubmit}>
        {type}
      </Button>
      <span
        className={c(s.authRedirectLink, {
          [s.loginLink]: !isLogin,
        })}
        onClick={() => {
          dispatch(changeType(isLogin ? "Зарегистрироваться" : "Войти"));
        }}
      >
        {isLogin ? "Создать аккаунт" : "Войти"}
      </span>
    </div>
  );
};
