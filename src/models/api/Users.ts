export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
