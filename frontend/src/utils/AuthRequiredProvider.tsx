import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
};

const AuthRequiredProvider = ({ children }: Props) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) return <Navigate to="/" />;

  return children;
};

export default AuthRequiredProvider;
