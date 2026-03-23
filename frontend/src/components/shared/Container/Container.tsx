import type { ReactNode } from "react";
import cn from "classnames";
import s from "./Container.module.css";

type ContainerProps = {
  center?: boolean;
  className?: string;
  children: ReactNode;
};

export const Container = ({
  children,
  center = true,
  className,
}: ContainerProps) => {
  return (
    <div
      className={cn(s.container, className, {
        [s.center]: center,
      })}
    >
      {children}
    </div>
  );
};
