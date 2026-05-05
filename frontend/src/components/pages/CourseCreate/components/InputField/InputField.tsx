import { Input } from "../../../../shared/Input/Input";
import s from "./InputField.module.css";

type Props = {
  title: string;
  inputPlaceholder: string;
  currentValue: string;
  onValueChange: (value: string) => void;
};

export const InputField = ({
  title,
  inputPlaceholder,
  currentValue,
  onValueChange,
}: Props) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <Input
        classNames={{ input: s.input }}
        value={currentValue}
        onChange={onValueChange}
        placeholder={inputPlaceholder}
      />
    </div>
  );
};
