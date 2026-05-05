import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router";
import { toggle } from "../redux/slices/modal.slice";

type Props = {
  children: ReactNode;
  loadingNode?: ReactNode;
};

const AuthRequired = ({ children, loadingNode }: Props) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.user);

  const { show } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth && !show && !isLoading) dispatch(toggle());
  }, [dispatch, isAuth, show, isLoading]);

  if (isLoading) return loadingNode ?? "Загрузка";

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default AuthRequired;
