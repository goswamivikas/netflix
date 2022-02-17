import { createContext } from "react";

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  accessToken: string;
}

export interface UserContext {
  user: User | null;
  setUser: Function;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});
