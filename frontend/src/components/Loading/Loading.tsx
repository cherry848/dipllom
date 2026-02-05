import s from "./Loading.module.css";
import cn from "classnames";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return <div className={cn(s.container, className)}>Загрузка</div>;
};

export default Loading;
