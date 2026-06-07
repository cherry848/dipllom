import styles from "./Header.module.css";
import { Modal } from "../../../shared/Modal/Modal";
import { AuthModal } from "../../../AuthModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import c from "classnames";
import { Link } from "react-router";
import {
  changeType,
  clearModal,
  toggle,
} from "../../../../redux/slices/modal.slice";

export const Header = () => {
  const { name, avatar } = useAppSelector((state) => state.user);
  const { show } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to={"/"} className={styles.logo}>
          <img src="/logo.jpg" alt="logo" />
        </Link>
        <span className={styles.catalog}>
          <span>Каталог</span>
          <img
            src="/expand-arrow.svg"
            alt="expand-arrow"
            className={styles.expand_arrow}
          />
        </span>
      </div>

      {name ? (
        <div
          className={c(styles.avatarWrapper, {
            [styles.bordered]: !avatar,
          })}
        >
          {avatar ? (
            <img
              className={styles.avatar}
              src={`http://localhost:3000${avatar}`}
              alt="avatar"
            />
          ) : (
            name[0].toUpperCase()
          )}
        </div>
      ) : (
        <div className={styles.buttons}>
          <button
            onClick={() => {
              dispatch(clearModal());
              dispatch(toggle());
              dispatch(changeType("Войти"));
            }}
            className={styles.button}
          >
            Войти
          </button>
          <button
            onClick={() => {
              dispatch(clearModal());
              dispatch(toggle());
              dispatch(changeType("Зарегистрироваться"));
            }}
            className={styles.button}
          >
            Регистрация
          </button>
        </div>
      )}
      <Modal>{show && <AuthModal />}</Modal>
    </div>
  );
};
