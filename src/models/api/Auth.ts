import { User } from "./Users";

export type LoginPayload = {
  email: string;
  password: string;
}

export type UserResponse = {
  user: User;
  token: string;
  refreshToken: string;
}

export type TokenItem = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
