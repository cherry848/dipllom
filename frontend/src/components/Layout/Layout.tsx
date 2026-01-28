import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
import { Modal } from "../Modal/Modal";
const Layout = () => {
  return (
    <div className={s.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
