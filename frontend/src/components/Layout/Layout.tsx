import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
import Loading from "../Loading";
import { useAuthorizeQuery } from "../../redux/api";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Modal } from "../shared/Modal/Modal";
import { AuthModal } from "../AuthModal/AuthModal";

const Layout = () => {
  const { isLoading } = useAuthorizeQuery();
  const { show } = useAppSelector((state) => state.modal);

  console.log(show);

  return (
    <div className={s.container}>
      <Header isLoading={isLoading} />

      <div className={s.content}>
        {isLoading ? <Loading className={s.loading} /> : <Outlet />}
        {show && (
          <Modal show={show}>
            <AuthModal />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Layout;
