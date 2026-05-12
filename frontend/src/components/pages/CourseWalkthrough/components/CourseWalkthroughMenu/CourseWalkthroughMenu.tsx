import { Checkbox } from "../../../../shared/Checkbox/Checkbox";
import s from "./CourseWalkthroughMenu.module.css";
import type { Module } from "./types/CourseWalkthroughMenu.types";
import c from "classnames";

type CourseWalkthroughMenuProps = {
  modules: Module[];
  name: string;
  toggleStep: (id: number) => void;
  checkedStep: number;
  passedSteps: Record<string, boolean>;
};

export const CourseWalkthroughMenu = ({
  name = "Python для геймеров: ООП простым языком на игровых примерах",
  modules,
  toggleStep,
  checkedStep,
  passedSteps,
}: CourseWalkthroughMenuProps) => {
  return (
    <div className={s.menu}>
      <h1 className={s.title}>{name}</h1>
      <div className={s.modules}>
        {modules.map((module) => {
          return (
            <div key={module.id} className={s.module}>
              <h1 className={s.moduleTitle}>
                <img className={s.funnel} src="/Funnel.svg" alt="" />
                <span className={s.moduleName}>
                  Модуль {module.id}. {module.title}
                </span>
              </h1>
              {module.steps.map((step, idx) => {
                return (
                  <div
                    onClick={() => toggleStep(+step.id)}
                    key={step.id}
                    className={c(s.step, {
                      [s.checked]: checkedStep === +step.id,
                    })}
                  >
                    <Checkbox checked={passedSteps[step.id]} />
                    <span>
                      Урок {step.id}. {step.title}
                    </span>
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
