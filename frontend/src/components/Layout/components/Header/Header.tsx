import styles from "./Header.module.css";

export const Header = () => {
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
      <div className={styles.buttons}>
        <button className={styles.button}>Войти</button>
        <button className={styles.button}>Регистрация</button>
      </div>
    </div>
  );
};
