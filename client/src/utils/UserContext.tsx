import { createContext } from "react";

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  accessToken: string;
}

export const UserContext = createContext<User | null>(null);
