import { useState } from "react";
import styles from "./Header.module.css";
import { Modal } from "../../../Modal/Modal";
import { AuthModal } from "../../../AuthModal/AuthModal";

type HeaderProps = {
  isLoading: boolean;
};

export const Header = ({ isLoading }: HeaderProps) => {
  const [modal, setModal] = useState({ show: false, type: "login" });

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

      {!isLoading && (
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
            auth="login"
            onClose={() => {
              setModal({ show: false, type: "login" });
            }}
          />
        ) : (
          <AuthModal
            auth="register"
            onClose={() => {
              setModal({ show: false, type: "login" });
            }}
          />
        )}
      </Modal>
    </div>
  );
};
