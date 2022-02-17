import { useState } from "react";
import { User } from "./UserContext";

export default function useUserAuth() {
  const getUser = () => JSON.parse(sessionStorage.getItem("user") || "null");

  const [user, setUser] = useState<User | null>(getUser());

  const saveUser = (user: User | null) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return { user, setUser: saveUser };
}
