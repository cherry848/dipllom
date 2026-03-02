import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "../Button/Button";
import s from "./Settings.module.css";
import { useUpdateMutation, useVerifyPasswordMutation } from "../../redux/api";
import { useAppSelector } from "../../hooks/reduxHooks";
import { List } from "../List/List";
import type { ErrorResponse } from "../../types/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input } from "../Input/Input";
import { Form } from "../Form/Form";

export const Settings = () => {
  const [data, setUserData] = useState({ name: "", password: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const { _id, avatar, name } = useAppSelector((state) => state.user);
  const [enableChangePassword, setEnableChangePassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [enableChangeName, setEnableChangeName] = useState(true);
  const [enableUploadImage, setEnableUploadImage] = useState(true);
  const [update] = useUpdateMutation();
  const [verifyPassword] = useVerifyPasswordMutation();
  const ref = useRef<HTMLInputElement>(null);

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
      if (!currentPassword) {
        return setCurrentPasswordError("Пустое поле!");
      }
      await verifyPassword({
        id: _id,
        password: currentPassword,
      }).unwrap();

      if (!data.password) {
        return setEnableChangePassword("Пустое поле!");
      }

      update({ id: _id, data: { password: data.password } });
      setUserData({ ...data, password: "" });
      setCurrentPassword("");
    } catch (error) {
      const err = error as FetchBaseQueryError;
      if (err.status === 600) {
        const data = err.data as ErrorResponse;
        setCurrentPasswordError(data.message);
      }
    }
  };

  const changeName = async () => {
    if (!data.name) return setEnableChangeName(false);

    await update({ id: _id, data: { name: data.name } });
    setEnableChangeName(true);
    setUserData({ ...data, name: "" });
  };

  return (
    <div className={s.container}>
      <List current="Настройки" />
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
          error={!enableChangeName ? "Пустое поле" : ""}
          label="Поменять имя"
        >
          <Input
            id="Поменять имя"
            value={data.name}
            placeholder={name}
            onChange={(name) => {
              setUserData({ ...data, name });
            }}
            onClick={() => {
              setEnableChangeName(true);
            }}
            error={!enableChangeName}
          ></Input>
        </Form>
        <Button onClick={changeName} className={s.button}>
          Изменить имя
        </Button>

        <Form
          error={currentPasswordError || enableChangePassword}
          label="Поменять пароль"
        >
          <Input
            value={currentPassword}
            onClick={() => {
              setCurrentPasswordError("");
              setEnableChangePassword("");
            }}
            id="Поменять пароль"
            placeholder="Текущий пароль"
            onChange={(password) => setCurrentPassword(password)}
            error={!!currentPasswordError}
            type="password"
          ></Input>
          <Input
            onChange={(password) => setUserData({ ...data, password })}
            placeholder="Новый пароль"
            value={data.password}
            onClick={() => {
              setEnableChangePassword("");
            }}
            error={!!enableChangePassword}
            type="password"
          ></Input>
        </Form>
        <Button onClick={changePassword} className={s.button}>
          Изменить пароль
        </Button>
      </div>
    </div>
  );
};
