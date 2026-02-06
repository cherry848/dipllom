export type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};
