export type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserLoginThunkReq = {
  email: string;
  password: string;
};
