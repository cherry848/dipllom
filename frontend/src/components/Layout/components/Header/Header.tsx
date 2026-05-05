import { useState } from "react";
import styles from "./Header.module.css";
import { Modal } from "../../../shared/Modal/Modal";
import { AuthModal } from "../../../AuthModal/AuthModal";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import c from "classnames";

type HeaderProps = {
  isLoading?: boolean;
};

export const Header = ({ isLoading }: HeaderProps) => {
  const [modal, setModal] = useState({ show: false, type: "login" });
  const { name, avatar } = useAppSelector((state) => state.user);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src="/logo.jpg" alt="logo" className={styles.logo} />
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
              setModal({ show: true, type: "login" });
            }}
            className={styles.button}
          >
            Войти
          </button>
          <button
            onClick={() => {
              setModal({ show: true, type: "register" });
            }}
            className={styles.button}
          >
            Регистрация
          </button>
        </div>
      )}
      <Modal>{modal.type === "login" ? <AuthModal /> : <AuthModal />}</Modal>
    </div>
  );
};
