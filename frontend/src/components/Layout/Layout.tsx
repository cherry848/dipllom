import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
import Loading from "../Loading";
import { useAuthorizeQuery } from "../../redux/api";
import { useAppSelector } from "../../hooks/reduxHooks";

const Layout = () => {
  const { isLoading } = useAuthorizeQuery();

  // пример как брать юзера
  const user = useAppSelector((state) => state.user);
  console.log(user);

  return (
    <div className={s.container}>
      <Header isLoading={isLoading} />

      <div className={s.content}>
        {isLoading ? <Loading className={s.loading} /> : <Outlet />}
      </div>
    </div>
  );
};

export default Layout;
