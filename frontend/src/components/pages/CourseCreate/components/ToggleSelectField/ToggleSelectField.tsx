import { useEffect, useRef, useState } from "react";
import s from "./ToggleSelectField.module.css";
import cn from "classnames";

type Props = {
  title: string;
  value: boolean;
  selectValues: [string, string];
  onValueChange: (value: boolean) => void;
};

export const ToggleSelectField = ({
  title,
  onValueChange,
  selectValues,
  value,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const activeValueString = selectValues[0];
  const inactiveValueSting = selectValues[1];

  useEffect(() => {
    const selectEl = selectRef.current;
    if (!selectEl) return;

    const handleClick = (e: MouseEvent) => {
      if (!selectEl.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>

      <div className={cn(s.select, isOpen && s.open)} ref={selectRef}>
        <div className={s.inner} onClick={() => setIsOpen(!isOpen)}>
          <div className={cn(s.value, value && s.green)}>
            {value ? activeValueString : inactiveValueSting}
          </div>
          <img src="/expand-arrow.svg" alt="" />
        </div>

        <div
          className={s.content}
          onClick={() => {
            onValueChange(!value);
            setIsOpen(false);
          }}
        >
          <div className={cn(s.value, !value && s.green)}>
            {value ? inactiveValueSting : activeValueString}
          </div>
        </div>
      </div>
    </div>
  );
};
