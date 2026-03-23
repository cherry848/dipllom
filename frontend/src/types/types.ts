export type ResBase<T = object> = T & { message: string };

export type ErrorResponse = {
  message: string;
};

export type BaseSort = Partial<{
  sortBy: string;
  order: number; // 1 | -1
  limit: number;
}>;
