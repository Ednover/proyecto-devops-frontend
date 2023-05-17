import { createContext } from "react";

interface IAuthContext {
  authUser: any;
  setAuthUser: (auth: any) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authUser: {},
  setAuthUser: () => {},
});

export default AuthContext;