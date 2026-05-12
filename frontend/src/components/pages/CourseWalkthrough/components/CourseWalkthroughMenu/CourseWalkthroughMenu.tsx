import s from "./CourseWalkthroughMenu.module.css";
import type { Module } from "./types/CourseWalkthroughMenu.types";

type CourseWalkthroughMenuProps = {
  modules: Module[];
  name: string;
};

export const CourseWalkthroughMenu = ({
  name,
  modules,
}: CourseWalkthroughMenuProps) => {
  return (
    <div className={s.menu}>
      <h1 className={s.title}>{name}</h1>
      <div className={s.modules}>
        {modules.map((module, idx) => {
          return (
            <div key={idx} className={s.module}>
              <h1 className={s.moduleTitle}>{module.title}</h1>
              {module.steps.map((step, idx) => {
                return (
                  <div key={idx} className={s.step}>
                    {step.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
