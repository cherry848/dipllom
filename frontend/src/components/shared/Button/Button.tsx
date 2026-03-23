import type { MouseEvent, ReactNode } from "react";
import cn from "classnames";
import s from "./Button.module.css";

interface ButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  className?: string;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  onClick,
  onMouseDown,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      className={cn(s.button, className)}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
