import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
import Loading from "../Loading";
import { useAuthorizeQuery } from "../../redux/api";

const Layout = () => {
  const { isLoading, data } = useAuthorizeQuery();

  console.log(data);

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
