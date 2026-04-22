import cn from "classnames";
import s from "./List.module.css";

type ListProps = {
  currentTab: string | null;
  onTabChange: (tab: string) => void;
};

export const List = ({ currentTab = "profile", onTabChange }: ListProps) => {
  return (
    <ul className={s.ul}>
      <li
        className={cn({
          [s.li]: currentTab === "profile",
        })}
        onClick={() => {
          onTabChange("profile");
        }}
      >
        Профиль
      </li>
      <li
        onClick={() => {
          onTabChange("stats");
        }}
        className={cn({
          [s.li]: currentTab === "stats",
        })}
      >
        Статистика
      </li>
      <li
        onClick={() => {
          onTabChange("courses");
        }}
        className={cn({
          [s.li]: currentTab === "courses",
        })}
      >
        Курсы
      </li>
      <li
        onClick={() => {
          onTabChange("settings");
        }}
        className={cn({
          [s.li]: currentTab === "settings",
        })}
      >
        Настройки
      </li>
    </ul>
  );
};
