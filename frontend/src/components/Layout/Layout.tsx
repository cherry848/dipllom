import { Outlet } from "react-router";
import s from "./layout.module.css";

const Layout = () => {
  return (
    <div className={s["container"]}>
      <header className={s["header"]}></header>

      <Outlet />
    </div>
  );
};

export default Layout;
