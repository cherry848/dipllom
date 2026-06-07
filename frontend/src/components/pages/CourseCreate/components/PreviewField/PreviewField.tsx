import { useMemo } from "react";
import s from "./PreviewField.module.css";
import cn from "classnames";
import { BACK_URL } from "../../../../../utils/constants";

type Props = {
  file?: File;
  imgSrc?: string;
  onFileChange: (file: File) => void;
};

export const PreviewField = ({ file, onFileChange, imgSrc }: Props) => {
  const image = useMemo(() => {
    if (file) return `url(${URL.createObjectURL(file)})`;
    if (imgSrc) return `url(${BACK_URL}${imgSrc})`;
  }, [file, imgSrc]);

  return (
    <div className={cn(s.container, !!image && s.hasImg)}>
      <label
        className={s.area}
        style={{ backgroundImage: image, backgroundSize: "cover" }}
      >
        <img src="/Edit Pencil.svg" alt="" />

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.jfif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileChange(file);
            e.target.value = "";
          }}
        />
        <div className={s.black}></div>
      </label>

      <div className={s.title}>Добавить превью курса</div>
    </div>
  );
};
