import { createContext } from "react";

export const UserRoleContext = createContext<{
  role?: "admin" | "auth" | "anon";
  error?: any;
}>({});
