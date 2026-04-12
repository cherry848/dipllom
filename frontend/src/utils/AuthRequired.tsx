import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
  loadingNode?: ReactNode;
};

const AuthRequired = ({ children, loadingNode }: Props) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) return loadingNode ?? "Загрузка";

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRequired;
