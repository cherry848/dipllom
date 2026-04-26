import { StatsWrapper } from "./components/StatsWrapper/StatsWrapper";
import s from "./Stats.module.css";

export const Stats = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Активность</h1>
      <div className={s.info}>
        <StatsWrapper />
        <div className={s.coursesContainer}>
          <div className={s.coursesContainerItem}>
            <h1 className={s.coursesCount}>2</h1>
            <span className={s.status}>Курсы в процессе</span>
          </div>
          <div className={s.coursesContainerItem}>
            <h1 className={s.coursesCount}>5</h1>
            <span className={s.status}>Завершенные курсы</span>
          </div>
        </div>
      </div>
    </div>
  );
};
