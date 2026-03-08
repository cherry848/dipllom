import cn from "classnames";
import s from "./List.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ListProps {
  current: string;
}

export const List = ({ current }: ListProps) => {
  const [clicked, setClicked] = useState(current);
  const navigate = useNavigate();

  return (
    <ul className={s.ul}>
      <li
        className={cn({
          [s.li]: clicked === "Профиль",
        })}
        onClick={() => {
          setClicked("Профиль");
          navigate("/profile");
        }}
      >
        Профиль
      </li>
      <li
        onClick={() => {
          setClicked("Статистика");
          navigate("/stats");
        }}
        className={cn({
          [s.li]: clicked === "Статистика",
        })}
      >
        Статистика
      </li>
      <li
        onClick={() => {
          setClicked("Курсы");
          navigate("/courses");
        }}
        className={cn({
          [s.li]: clicked === "Курсы",
        })}
      >
        Курсы
      </li>
      <li
        onClick={() => {
          setClicked("Настройки");
          navigate("/settings");
        }}
        className={cn({
          [s.li]: clicked === "Настройки",
        })}
      >
        Настройки
      </li>
    </ul>
  );
};
