import s from "../Sidebar/Sidebar.module.css";

import { FilterGroup } from "../FilterGroup/FIlterGroup";
import { SortFIlter } from "../SortFilter/SortFilter";
import { FILTERS, type Filter, type Filters } from "../Catalog/Catalog";
import { Form } from "../shared/Form/Form";
import { Input } from "../shared/Input/Input";
import { Button } from "../shared/Button/Button";

const SORTS = [
  { id: "amount", label: "Кол-во пользователей" },
  { id: "rating", label: "Рейтинг" },
  { id: "date", label: "Дата публикации" },
];

interface SidebarProps {
  onToggleFilter: (id: Filter) => void;
  onToggleSort: (id: string) => void;
  filters: Filters;
  sort: {
    id: string | null;
    direction: "asc" | "desc" | null;
  };
  searchValue: string;
  handleSearchChanges: (value: string) => void;
  onClick: () => void;
}

export const Sidebar = ({
  onToggleFilter,
  onToggleSort,
  filters,
  sort,
  searchValue,
  handleSearchChanges,
  onClick,
}: SidebarProps) => {
  return (
    <>
      <div className={s.sidebar}>
        <Form>
          <Input
            id="Search"
            classNames={{ container: s.search, input: s.input }}
            placeholder="Название курса"
            value={searchValue}
            onChange={handleSearchChanges}
            icon={<img className={s.img} src="/search.svg" alt="" />}
          ></Input>
        </Form>
        <div className={s.settingsWrapper}>
          <div className={s.checkboxFilters}>
            {FILTERS.map((group) => (
              <FilterGroup
                filters={filters}
                onChange={onToggleFilter}
                title={group.title}
                options={group.options}
              />
            ))}
          </div>
          <div className={s.sortFilters}>
            {SORTS.map((option) => {
              return (
                <SortFIlter
                  clicked={sort.id === option.id}
                  id={option.id}
                  onClick={onToggleSort}
                  label={option.label}
                  direction={sort.id === option.id ? sort.direction : null}
                />
              );
            })}
          </div>
        </div>
        <Button onClick={onClick} className={s.button}>
          Искать
        </Button>
      </div>
      <div className={s.catalog}></div>
    </>
  );
};
