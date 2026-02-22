import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "../Button/Button";
import { ChangeProfileInput } from "../ChangeProfileInput/ChangeProfileInput";
import s from "./Settings.module.css";
import { useUpdateMutation, useVerifyPasswordMutation } from "../../redux/api";
import { useAppSelector } from "../../hooks/reduxHooks";
import { List } from "../List/List";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const Settings = () => {
  const [data, setUserData] = useState({ name: "", password: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const { _id, avatar, name } = useAppSelector((state) => state.user);
  const [enableChange, setEnableChange] = useState(true);
  const [update] = useUpdateMutation();
  const [verifyPassword] = useVerifyPasswordMutation();
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      await update({ id: _id, data: formData });
    }
  };

  const changePassword = async () => {
    try {
      await verifyPassword({
        id: _id,
        password: currentPassword,
      }).unwrap();

      update({ id: _id, data: { password: data.password } });
    } catch (error) {
      const err = error as FetchBaseQueryError;
      if (err.status === 600) setEnableChange(false);
    }
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
          />

          <img
            className={avatar ? s.avatar : s.img}
            src={avatar ? `http://localhost:3000${avatar}` : "/Edit Pencil.svg"}
            alt=""
          />
        </div>
        <ChangeProfileInput
          changeable
          value={name}
          onChange={(name) => {
            setUserData({ ...data, name });
          }}
          type="name"
        />
        <Button
          onClick={() => {
            update({ id: _id, data: { name: data.name } });
          }}
          className={s.button}
        >
          Изменить имя
        </Button>
        <ChangeProfileInput
          onClick={() => {
            setEnableChange(true);
          }}
          onChange={(password) => setCurrentPassword(password)}
          changeable={enableChange}
          onValueChange={(password) => setUserData({ ...data, password })}
          type="password"
        />
        <Button onClick={changePassword} className={s.button}>
          Изменить пароль
        </Button>
      </div>
    </div>
  );
};
