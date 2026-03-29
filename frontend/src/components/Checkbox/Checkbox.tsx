import { type ReactNode } from "react";
import s from "../Checkbox/Checkbox.module.css";
import c from "classnames";
import type { Filter } from "../Catalog/Catalog";

interface CheckboxProps {
  children?: ReactNode;
  onChange?: () => void;
  checked?: boolean;
  onClick?: (id: Filter) => void;
}

export const Checkbox = ({
  children,
  onChange,
  checked,
  onClick,
}: CheckboxProps) => {
  return (
    <label className={s.label}>
      <input
        checked={checked}
        onChange={onChange}
        onClick={() => onClick}
        className={s.input}
        type="checkbox"
      />
      <span
        className={c(s.checkmark, {
          [s.checked]: checked,
        })}
      >
        {checked && (
          <img className={s.img} src="/Vector--checkbox.svg" alt="Vector" />
        )}
      </span>
      {children}
    </label>
  );
};
