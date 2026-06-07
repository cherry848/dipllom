import { useState } from "react";
import type { Course } from "../../../../../types/course.types";
import { Button } from "../../../../shared/Button/Button";
import { InputField } from "../InputField/InputField";
import { PreviewField } from "../PreviewField/PreviewField";
import { SelectField } from "../SelectField/SelectField";
import { ToggleSelectField } from "../ToggleSelectField/ToggleSelectField";
import s from "./CourseActionForm.module.css";
import { CATEGORIES, TAGS } from "./utils/constants";

export type CourseData = Pick<
  Course,
  "img" | "name" | "desc" | "tags" | "status" | "category"
> & { file?: File };

type Props = {
  originalCourse: CourseData | undefined;
  isCreate?: boolean;
  handleSubmit: (course: CourseData) => void;
};

const initialCourse: CourseData = {
  img: "",
  tags: ["Frontend", "Backend"],
  name: "",
  status: false,
  category: "",
  desc: "",
};

export const CourseActionForm = ({
  originalCourse,
  isCreate,
  handleSubmit,
}: Props) => {
  const [manualCourse, setManualCourse] = useState<CourseData>(
    originalCourse ?? initialCourse
  );

  const disableBtn =
    !manualCourse.name.trim() ||
    !manualCourse.category.trim() ||
    !manualCourse.desc.trim() ||
    manualCourse.tags.length === 0;

  return (
    <form
      className={s.container}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(manualCourse);
      }}
    >
      <div className={s.rows}>
        <div className={s.row}>
          <PreviewField
            file={manualCourse.file}
            imgSrc={manualCourse.img}
            onFileChange={(file) => setManualCourse({ ...manualCourse, file })}
          />

          <InputField
            title="Название курса"
            inputPlaceholder="Название курса"
            currentValue={manualCourse.name}
            onValueChange={(name) =>
              setManualCourse(() => ({ ...manualCourse, name }))
            }
          />

          <InputField
            title="Описание курса"
            inputPlaceholder="Описание курса"
            currentValue={manualCourse.desc}
            onValueChange={(desc) =>
              setManualCourse(() => ({ ...manualCourse, desc }))
            }
          />
        </div>

        <div className={s.row}>
          <SelectField
            title="Теги"
            selectPlaceholder="Теги"
            multiple
            selectValues={TAGS}
            currentValue={manualCourse.tags}
            onValueChange={(tags) =>
              setManualCourse(() => ({ ...manualCourse, tags }))
            }
          />

          {!isCreate && (
            <ToggleSelectField
              title="Статус курса"
              selectValues={["Опубликовано", "Деактивировано"]}
              value={manualCourse.status}
              onValueChange={(status) =>
                setManualCourse(() => ({ ...manualCourse, status }))
              }
            />
          )}

          <SelectField
            title="Выберите категорию"
            selectPlaceholder="Категория"
            selectValues={CATEGORIES}
            currentValue={manualCourse.category}
            onValueChange={(category) =>
              setManualCourse(() => ({ ...manualCourse, category }))
            }
          />
        </div>
      </div>

      <Button className={s.button} disable={disableBtn}>
        {isCreate ? "Создать курс" : "Сохранить"}
      </Button>
    </form>
  );
};
