import { Courses } from "../Courses/Courses";
import { Sidebar } from "../Sidebar/Sidebar";
import s from "../Catalog/Catalog.module.css";
import { useEffect, useState } from "react";
import { useLazyGetCatalogCoursesQuery } from "../../redux/api";

export const FILTERS = [
  {
    title: "Категории",
    key: "category",
    options: [
      { id: "web", label: "Веб-разработка" },
      { id: "games", label: "Разработка игр" },
      { id: "mobile", label: "Мобильная разработка" },
    ],
  },
  {
    title: "Длительность",
    key: "duration",
    options: [
      { id: "long", label: "Долгие" },
      { id: "medium", label: "Средние" },
      { id: "short", label: "Короткие" },
    ],
  },
  {
    title: "Язык программирования",
    key: "language",
    options: [
      { id: "python", label: "Python" },
      { id: "java", label: "Java" },
      { id: "cpp", label: "C++" },
    ],
  },
] as const;

type SortOptions = {
  amount: "up" | "down" | null;
  rating: "up" | "down" | null;
  date: "up" | "down" | null;
};

export type Filters = {
  web: boolean;
  games: boolean;
  mobile: boolean;
  long: boolean;
  medium: boolean;
  short: boolean;
  python: boolean;
  java: boolean;
  cpp: boolean;
};

export type Filter = keyof Filters;

export type SortOptionKey = keyof SortOptions;

export type Sort = {
  amount: "up" | "down" | null;
  rating: "up" | "down" | null;
  date: "up" | "down" | null;
};

type BuildQueryType = {
  category?: string[];
  duration?: string[];
  language?: string[];
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  page?: number;
};

export const Catalog = () => {
  const [filters, setFilters] = useState<Filters>({
    web: false,
    games: false,
    mobile: false,
    long: false,
    medium: false,
    short: false,
    python: false,
    java: false,
    cpp: false,
  });

  const [sort, setSort] = useState<{
    id: string | null;
    direction: "asc" | "desc" | null;
  }>({ id: null, direction: null });

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [getCourses, { data: { data, pagination } = {}, isLoading }] =
    useLazyGetCatalogCoursesQuery();

  const toggleFilter = (id: Filter) => {
    setFilters((prev) => {
      return { ...prev, [id]: !prev[id] };
    });
  };

  const toggleSort = (id: string) => {
    setSort((prev) => {
      if (prev.id !== id) {
        return { id, direction: "asc" };
      }
      if (prev.direction === "asc") return { id, direction: "desc" };
      if (prev.direction === "desc") return { id: null, direction: null };
      return { id, direction: "asc" };
    });
  };

  const searchSubmit = async () => {
    getCourses({ search });
  };

  const togglePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const buildQuery = () => {
      const body: BuildQueryType = {};

      const category = [];
      if (filters.web) category.push(FILTERS[0].options[0].label);
      if (filters.games) category.push(FILTERS[0].options[1].label);
      if (filters.mobile) category.push(FILTERS[0].options[2].label);

      const duration = [];
      if (filters.short) duration.push(FILTERS[1].options[0].label);
      if (filters.medium) duration.push(FILTERS[1].options[1].label);
      if (filters.long) duration.push(FILTERS[1].options[2].label);

      const language = [];
      if (filters.python) language.push(FILTERS[2].options[0].label);
      if (filters.java) language.push(FILTERS[2].options[1].label);
      if (filters.cpp) language.push(FILTERS[2].options[2].label);

      if (category.length) body.category = category;
      if (duration.length) body.duration = duration;
      if (language.length) body.language = language;

      if (sort.id && sort.direction) {
        body.sortBy = sort.id;
        body.order = sort.direction;
      }

      if (search) body.search = search;

      if (page) body.page = page;

      return body;
    };

    getCourses(buildQuery());
  }, [getCourses, filters, sort, page]);

  return (
    <div className={s.catalog}>
      <Sidebar
        onClick={searchSubmit}
        handleSearchChanges={setSearch}
        searchValue={search}
        sort={sort}
        filters={filters}
        onToggleFilter={toggleFilter}
        onToggleSort={toggleSort}
      />
      {data && pagination && (
        <Courses
          currentPage={page}
          togglePage={togglePage}
          pagination={pagination}
          isLoading={isLoading}
          courses={data}
        />
      )}
    </div>
  );
};
