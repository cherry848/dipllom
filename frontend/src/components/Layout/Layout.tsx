import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
const Layout = () => {
  return (
    <div className={s.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
