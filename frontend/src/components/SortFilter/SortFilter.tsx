import c from "classnames";
import { Pointer } from "../../icons/Pointer";
import s from "../SortFilter/SortFilter.module.css";

interface SortFilterProps {
  label: string;
  onClick: (key: string) => void;
  id: string;
  direction: "asc" | "desc" | null;
  clicked: boolean;
}

export const SortFIlter = ({
  label,
  onClick,
  id,
  clicked,
  direction,
}: SortFilterProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={c(s.sortFilter, {
        [s.clicked]: clicked,
      })}
    >
      <label>{label}</label>
      <div className={s.pointerContainer}>
        <Pointer clicked={direction === "asc"} />
        <Pointer clicked={direction === "desc"} />
      </div>
    </div>
  );
};
