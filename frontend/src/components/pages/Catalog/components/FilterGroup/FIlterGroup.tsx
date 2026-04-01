import { Checkbox } from "../../../../shared/Checkbox/Checkbox";
import s from "../FilterGroup/FilterGroup.module.css";
import type { Filter, Filters } from "../../Catalog";

export interface FilterGroupProps {
  title: string;
  options: readonly { id: Filter; label: string }[];
  filters: Filters;
  onChange: (id: Filter) => void;
}

export const FilterGroup = ({
  title,
  options,
  filters,
  onChange,
}: FilterGroupProps) => {
  return (
    <div className={s.checkboxFilter}>
      <h1 className={s.title}>{title}</h1>
      {options.map((option) => {
        return (
          <Checkbox
            key={option.id}
            checked={!!filters[option.id]}
            onChange={() => onChange(option.id)}
          >
            {option.label}
          </Checkbox>
        );
      })}
    </div>
  );
};
