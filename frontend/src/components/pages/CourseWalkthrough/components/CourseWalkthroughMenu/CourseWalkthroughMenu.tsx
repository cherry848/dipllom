import { useCompleteLessonMutation } from "../../../../../redux/api";
import type { ProgressByStepId } from "../../../../../types/progress.types";
import { Checkbox } from "../../../../shared/Checkbox/Checkbox";
import s from "./CourseWalkthroughMenu.module.css";
import type { Module } from "./types/CourseWalkthroughMenu.types";
import c from "classnames";

type CourseWalkthroughMenuProps = {
  modules: Module[];
  name: string;
  toggleStep: (id: string) => void;
  currentStep: string | undefined;
  progressByStep: ProgressByStepId[];
};

export const CourseWalkthroughMenu = ({
  name = "Python для геймеров: ООП простым языком на игровых примерах",
  modules,
  toggleStep,
  currentStep,
  progressByStep,
}: CourseWalkthroughMenuProps) => {
  const checkComplete = (stepId: string) => {
    return progressByStep.some(
      (step) => step.stepId === stepId && step.completed,
    );
  };

  return (
    <div className={s.menu}>
      <h1 className={s.title}>{name}</h1>
      <div className={s.modules}>
        {modules.map((module, idx) => {
          return (
            <div className={s.module}>
              <h1 className={s.moduleTitle}>
                <img className={s.funnel} src="/Funnel.svg" alt="" />
                <span className={s.moduleName}>
                  Модуль {idx + 1}. {module.title}
                </span>
              </h1>
              {module.steps.map((step, idx) => {
                return (
                  <div
                    onClick={() => toggleStep(step.stepId)}
                    className={c(s.step, {
                      [s.checked]: currentStep === step.stepId,
                    })}
                  >
                    <Checkbox checked={checkComplete(step.stepId)} />
                    <span>
                      Урок {idx + 1}. {step.title}
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
