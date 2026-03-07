import type { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  className: string;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  onClick,
  onMouseDown,
  children,
  className,
}: ButtonProps) => {
  return (
    <button className={className} onMouseDown={onMouseDown} onClick={onClick}>
      {children}
    </button>
  );
};
