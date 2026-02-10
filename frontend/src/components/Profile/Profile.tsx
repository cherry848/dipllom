import s from "../Profile/Profile.module.css";
import { useAppSelector } from "../../hooks/reduxHooks";

export const Profile = () => {

  const {createdAt, email, name} = useAppSelector(state => state.user);

  console.log(email);

  return (
    <div className={s.container}>
      <ul className={s.ul}>
        <li className={s.li}>Профиль</li>
        <li>Статистика</li>
        <li>Курсы</li>
        <li>Настройки</li>
      </ul>
      <div className={s.profileWrapper}>
        <div className={s.profile}>
          <img className={s.img} src={undefined} alt="" />
          <div className={s.profileInfoWrapper}>
            <p className={s.info}>
              <span>Имя: </span>
              <span>{name}</span>
            </p>
            <p className={s.info}>
              <span>Логин: </span>
              <span>{email}</span>
            </p>
            <p className={s.info}>
              <span>Дата регистрации: </span>
              <span>{createdAt}</span>
            </p>
          </div>
          <button className={s.button}>Редактировать профиль</button>
        </div>
        <div className={s.profileStats}>
          <div className={s.profileStatsGrids}>
            <div className={s.statsWrapper}>
                <div className={s.wrapper}>
              <div className={s.grids1}>
                {Array.from(Array(21)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>февр.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids2}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>март</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids3}>
                {Array.from(Array(35)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>апр.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids4}>
                {Array.from(Array(21)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>май</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids5}>
                {Array.from(Array(35)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>июнь</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids6}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>июль</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids7}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>авг.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids8}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>сент.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids9}>
                {Array.from(Array(35)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>окт.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids10}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>нояб.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids11}>
                {Array.from(Array(28)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>дек.</span>
            </div>
            <div className={s.wrapper}>
              <div className={s.grids12}>
                {Array.from(Array(23)).map((_, i) => (
                  <div className={s.grid} key={i}></div>
                ))}
              </div>
              <span>янв.</span>
            </div>
            </div>
          </div>
          <div className={s.profileSummary}>
            <div className={s.profileSummaryMetrics}>
              <span>0</span>
              <span>дней без перерыва</span>
            </div>
            <div className={s.profileSummaryMetrics}>
              <span>2</span>
              <span>дней без перерыва(макс)</span>
            </div>
            <div className={s.profileSummaryMetrics}>
              <span>5</span>
              <span>задач решено</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
