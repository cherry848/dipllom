import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "../shared/Button/Button";
import s from "./Settings.module.css";
import { useUpdateMutation, useVerifyPasswordMutation } from "../../redux/api";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input } from "../shared/Input/Input";
import { Form } from "../shared/Form/Form";

const ERRORS = {
  EMPTY: "Пустое поле!",
  PASSWORD_MISMACHES: "Пароли не совпадают",
};

const USER_DATA = {
  name: "",
  password: "",
  currentPassword: "",
};

const ERROR_STATE = {
  nameForm: { error: "", errorInputId: "" },
  passwordForm: { error: "", errorInputId: "" },
};

export const Settings = () => {
  const [userData, setUserData] = useState(USER_DATA);
  const [errors, setErrors] = useState(ERROR_STATE);
  const [enableUploadImage, setEnableUploadImage] = useState(true);
  const [focusName, setFocusName] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const { _id, avatar, name } = useAppSelector((state) => state.user);

  const [update] = useUpdateMutation();
  const [verifyPassword] = useVerifyPasswordMutation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) return setEnableUploadImage(false);

      const formData = new FormData();
      formData.append("avatar", file);

      await update({ id: _id, data: formData });
      setEnableUploadImage(true);
    }
  };

  const changePassword = async () => {
    try {
      if (!userData.currentPassword) {
        return setErrors((prev) => ({
          ...prev,
          passwordForm: {
            error: ERRORS.EMPTY,
            errorInputId: "Поменять пароль",
          },
        }));
      }

      if (!userData.password) {
        return setErrors((prev) => ({
          ...prev,
          passwordForm: { error: ERRORS.EMPTY, errorInputId: "Новый пароль" },
        }));
      }

      setErrors(ERROR_STATE);

      await verifyPassword({
        id: _id,
        password: userData.currentPassword,
      }).unwrap();

      await update({ id: _id, data: { password: userData.password } });

      setUserData(USER_DATA);
    } catch (error) {
      const err = error as FetchBaseQueryError;
      if (err.status === 600) {
        setErrors((prev) => ({
          ...prev,
          passwordForm: {
            error: ERRORS.PASSWORD_MISMACHES,
            errorInputId: "Поменять пароль",
          },
        }));
      }
    }
  };

  const changeName = async () => {
    if (!userData.name) {
      return setErrors((prev) => ({
        ...prev,
        nameForm: { error: ERRORS.EMPTY, errorInputId: "Поменять имя" },
      }));
    }

    setErrors(ERROR_STATE);

    await update({ id: _id, data: { name: userData.name } });
    setUserData(USER_DATA);
  };

  return (
    <div className={s.container}>
      <span className={s.settings}>Настройки</span>
      <div className={s.wrapper}>
        <div onClick={() => ref.current?.click()} className={s.imgWrapper}>
          <input
            onChange={handleFileChange}
            ref={ref}
            className={s.file}
            type="file"
            accept=".jpg,.jpeg,.png"
          />

          <img
            className={avatar ? s.avatar : s.img}
            src={avatar ? `http://localhost:3000${avatar}` : "/Edit Pencil.svg"}
            alt=""
          />
        </div>
        {!enableUploadImage && (
          <span className={s.error}>Загружать можно только картинки</span>
        )}

        <Form
          onSubmit={async () => {
            await changeName();
            setFocusName(false);
          }}
          onFocus={() => setFocusName(true)}
          onBlur={() => setFocusName(false)}
          error={
            !focusName && errors.nameForm.error ? errors.nameForm.error : ""
          }
          label="Поменять имя"
        >
          <Input
            classNames={{ input: s.input, container: s.inputContainer }}
            id="Поменять имя"
            value={userData.name}
            placeholder={name}
            onChange={(name) => {
              setErrors(ERROR_STATE);
              setUserData({ ...userData, name });
            }}
            error={!focusName && !!errors.nameForm.error}
          />
          <Button onMouseDown={(e) => e.preventDefault()} className={s.button}>
            Изменить имя
          </Button>
        </Form>

        <Form
          onSubmit={async () => {
            await changePassword();
            setFocusPassword(false);
          }}
          onFocus={() => setFocusPassword(true)}
          onBlur={() => setFocusPassword(false)}
          error={
            !focusPassword && errors.passwordForm.error
              ? errors.passwordForm.error
              : ""
          }
          label="Поменять пароль"
        >
          <Input
            classNames={{ input: s.input, container: s.inputContainer }}
            value={userData.currentPassword}
            id="Поменять пароль"
            placeholder="Текущий пароль"
            onChange={(currentPassword) => {
              setErrors(ERROR_STATE);
              setUserData((prev) => ({ ...prev, currentPassword }));
            }}
            error={
              errors.passwordForm.errorInputId === "Поменять пароль" &&
              !focusPassword
            }
            type="password"
          />
          <Input
            classNames={{ input: s.input, container: s.inputContainer }}
            id="Новый пароль"
            onChange={(password) => {
              setErrors(ERROR_STATE);
              setUserData((prev) => ({ ...prev, password }));
            }}
            placeholder="Новый пароль"
            value={userData.password}
            error={
              errors.passwordForm.errorInputId === "Новый пароль" &&
              !focusPassword
            }
            type="password"
          />
          <Button className={s.button}>Изменить пароль</Button>
        </Form>
      </div>
    </div>
  );
};
