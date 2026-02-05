import { Outlet } from "react-router";
import s from "./layout.module.css";
import { Header } from "./components/Header/Header";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { authorize } from "../../redux/slices/user.slice";
import Loading from "../Loading";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorize()).finally(() => setIsLoading(false));
  });

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
