import { Button } from "../Button/Button";
import { ChangeProfileInput } from "../ChangeProfileInput/ChangeProfileInput";
import s from "./Settings.module.css";

export const Settings = () => {
  return (
    <div className={s.container}>
      <ul className={s.ul}>
        <li>Профиль</li>
        <li>Статистика</li>
        <li>Курсы</li>
        <li className={s.li}>Настройки</li>
      </ul>
      <span className={s.settings}>Настройки</span>
      <div className={s.wrapper}>
        <div className={s.imgWrapper}><img className={s.img} src="/Edit Pencil.svg" alt="" /></div>
        <ChangeProfileInput value="vfrcbv"  type="name"/>
        <Button>Изменить имя</Button>
        <ChangeProfileInput type="password"/>
        <Button>Изменить пароль</Button>
      </div>
    </div>
  );
};
