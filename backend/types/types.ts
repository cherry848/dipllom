export type ReqBodyType<T extends object> = Partial<T> | undefined;

export type ResBodyType<T extends object> = T & { message?: string };

export type Cookies = Partial<{
  refreshToken: string;
}>;

export type ReqSearchQueryType<T extends object> = Partial<
  Record<keyof T, string>
>;

export type BaseSort = Partial<{
  sortBy: string;
  order: number; // 1 | -1
  limit: number;
}>;

export type ToString<T extends object> = Record<keyof T, string>;
