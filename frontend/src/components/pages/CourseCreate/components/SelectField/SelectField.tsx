import { useEffect, useRef, useState } from "react";
import s from "./SelectField.module.css";
import cn from "classnames";

type BaseProps = {
  title: string;
  selectPlaceholder: string;
  selectValues: string[];
};

type SingleSelectProps = {
  multiple?: false;
  currentValue: string;
  onValueChange: (value: string) => void;
};

type MultipleSelectProps = {
  multiple: true;
  currentValue: string[];
  onValueChange: (value: string[]) => void;
};

type Props = BaseProps & (SingleSelectProps | MultipleSelectProps);

export const SelectField = ({
  title,
  selectPlaceholder,
  selectValues,
  multiple,
  currentValue,
  onValueChange,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const isEmptyValue = !currentValue.length;

  const handleSelectValueChange = (value: string) => {
    if (multiple) {
      const newValue = currentValue.includes(value)
        ? currentValue.filter((v) => v !== value)
        : [...currentValue, value];
      onValueChange?.(newValue);
      return;
    }

    const newValue = currentValue !== value ? value : "";
    onValueChange?.(newValue);
  };

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;

    const handleClick = (e: MouseEvent) => {
      if (!select.contains(e.target as Node)) setIsActive(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>

      <div className={cn(s.select, isActive && s.active)} ref={selectRef}>
        <div className={s.inner} onClick={() => setIsActive(!isActive)}>
          {isEmptyValue ? (
            <div className={s.placeholder}>{selectPlaceholder}</div>
          ) : multiple ? (
            <div className={s.values}>
              {currentValue.map((value, idx) => {
                const isLast = idx === currentValue.length - 1;

                return (
                  <div key={idx} className={s.value}>
                    {value}
                    {!isLast && ","}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={s.value}>{currentValue}</div>
          )}

          <img src="/expand-arrow.svg" alt="" />
        </div>

        <div className={s.content}>
          <div className={s.title}>{title}:</div>
          <div className={s.content_list}>
            {selectValues.map((value, idx) => {
              const isActive = multiple
                ? currentValue.includes(value)
                : value === currentValue;

              return (
                <div
                  key={idx}
                  className={cn(s.content_value, isActive && s.active)}
                  onClick={() => {
                    handleSelectValueChange(value);
                    if (!multiple) setIsActive(false);
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
