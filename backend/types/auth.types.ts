import { ReqBodyType } from "./types";

type AuthBase = {
  email: string;
  password: string;
};

export type AuthRegisterControllerData = ReqBodyType<AuthBase>;

export type AuthLoginControllerData = ReqBodyType<AuthBase>;

export type AuthGetTokensServiceReturnData = {
  accessToken: string;
  refreshToken: string;
};

export type AuthRegisterServiceData = AuthBase;

export type AuthLoginServiceData = AuthBase;

export type AuthAccessJwtData = {
  userId: string;
};

export type AuthRefreshJwtData = {
  userId: string;
};
