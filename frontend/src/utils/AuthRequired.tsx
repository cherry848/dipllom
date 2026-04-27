import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router";
import { Modal } from "../components/shared/Modal/Modal";
import { AuthModal } from "../components/AuthModal/AuthModal";
import { toggle } from "../redux/slices/user.slice";

type Props = {
  children: ReactNode;
  loadingNode?: ReactNode;
};

const AuthRequired = ({ children, loadingNode }: Props) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.user);

  const { email, password, show, type } = useAppSelector(
    (state) => state.modal,
  );

  const dispatch = useAppDispatch();

  if (isLoading) return loadingNode ?? "Загрузка";

  if (!isAuth) {
    return (
      <Modal>
        <AuthModal
          auth={type === "login" ? "Войти" : "Зарегистрироваться"}
          onToggle={() => {
            dispatch(toggle());
          }}
        />
      </Modal>
    );
  }

  return children;
};

export default AuthRequired;
