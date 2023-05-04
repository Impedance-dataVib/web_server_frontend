import React, { useContext, useEffect, useState } from "react";
// import { AUTH_STATUS } from "../hooks";
// import { useAuthenticator } from "../hooks";

export interface IAuth {
  authToken: string | undefined;
  refreshToken: string | undefined;
  setAuthToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  signOut: () => void;
  readyState: boolean;
}

const initialState: IAuth = {
  authToken: "",
  refreshToken: "",
  setAuthToken: () => {},
  setRefreshToken: () => {},
  signOut: () => {},
  readyState: false,
};

export const AUTH_STATUS = {
  AUTHENITCATED: "authenticated",
  LOADING: "loading",
  IN_PROGRESS: "in_progress",
  UNAUTHENTICATED: "un_authenticated",
};

const AUTH_TOKEN_KEY = "vib-360-auth-token";
const REFRESH_TOKEN_KEY = "vib-360-refresh-token";

const authContext = React.createContext<IAuth>(initialState);

const AuthProvider = ({ children }: any) => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [readFromSessionStorage, setReadFromSessionStorage] =
    useState<boolean>(false);
  const [readyState, setReadyState] = useState<boolean>(false);

  useEffect(() => {
    // console.log("theAuthToken called");
    const theAuthToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
    const refToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

    // console.log("theAuthToken = ", theAuthToken);

    setAuthToken(theAuthToken || "");
    setRefreshToken(refToken || "");
    setReadFromSessionStorage(true);
    setReadyState(true);
  }, []);

  useEffect(() => {
    if (readFromSessionStorage) {
      sessionStorage.setItem(AUTH_TOKEN_KEY, authToken || "");
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken || "");
    }
  }, [authToken, refreshToken, readFromSessionStorage]);

  const signOut = () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    setAuthToken(undefined);
    setRefreshToken(undefined);
  };

  return (
    <authContext.Provider
      value={{
        authToken,
        refreshToken,
        setAuthToken,
        setRefreshToken,
        signOut,
        readyState,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(authContext);

  let authentcated = false;
  if (
    auth.authToken !== undefined &&
    String(auth.authToken)?.trim().length > 0 &&
    auth.refreshToken !== undefined &&
    String(auth.refreshToken)?.trim().length > 0
  ) {
    authentcated = true;
  }

  return {
    ...auth,
    authStatus: authentcated
      ? AUTH_STATUS.AUTHENITCATED
      : AUTH_STATUS.UNAUTHENTICATED,
  };
};

export default AuthProvider;
