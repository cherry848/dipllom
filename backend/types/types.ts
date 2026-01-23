export type ReqBodyType<T extends object> = Partial<T> | undefined;

export type ResBodyType<T extends object> = T & { message?: string };

export type Cookies = Partial<{
  refreshToken: string;
}>;
