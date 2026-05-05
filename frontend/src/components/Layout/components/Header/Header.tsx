import { useState } from "react";
import styles from "./Header.module.css";
import { Modal } from "../../../shared/Modal/Modal";
import { AuthModal } from "../../../AuthModal/AuthModal";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import c from "classnames";
import { Link } from "react-router";

type HeaderProps = {
  isLoading?: boolean;
};

export const Header = ({ isLoading }: HeaderProps) => {
  const [modal, setModal] = useState({ show: false, type: "login" });
  const { name, avatar } = useAppSelector((state) => state.user);

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
      <Modal
        show={modal.show}
        onClose={() => {
          setModal({ show: false, type: "login" });
        }}
      >
        {modal.type === "login" ? (
          <AuthModal
            auth="Войти"
            onClose={() => {
              setModal({ show: false, type: "login" });
            }}
          />
        ) : (
          <AuthModal
            auth="Зарегистрироваться"
            onClose={() => {
              setModal({ show: false, type: "login" });
            }}
          />
        )}
      </Modal>
    </div>
  );
};
