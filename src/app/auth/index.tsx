import React, { useContext, useEffect, useMemo, useState } from "react";

export interface IAuth {
  userName: string | undefined;
  authToken: string | undefined;
  refreshToken: string | undefined;
  setAuthToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  signOut: () => void;
  readyState: boolean;
  setUserName: (token: string) => void;
}

const initialState: IAuth = {
  userName: "",
  authToken: "",
  refreshToken: "",
  setAuthToken: () => {},
  setRefreshToken: () => {},
  signOut: () => {},
  readyState: false,
  setUserName: () => {},
};

export const AUTH_STATUS = {
  AUTHENITCATED: "authenticated",
  LOADING: "loading",
  IN_PROGRESS: "in_progress",
  UNAUTHENTICATED: "un_authenticated",
};

export const AUTH_TOKEN_KEY = "vib-360-auth-token";
export const REFRESH_TOKEN_KEY = "vib-360-refresh-token";
export const USER_NAME_ROLE = "vib-360-user-name-role";

const authContext = React.createContext<IAuth>(initialState);

const AuthProvider = ({ children }: any) => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [readFromSessionStorage, setReadFromSessionStorage] =
    useState<boolean>(false);
  const [readyState, setReadyState] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | undefined>();

  useEffect(() => {
    const theAuthToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
    const refToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    const userNameRole = sessionStorage.getItem(USER_NAME_ROLE);
    setAuthToken(theAuthToken || "");
    setRefreshToken(refToken || "");
    setUserName(userNameRole || "");
    setReadFromSessionStorage(true);
    setReadyState(true);
  }, []);

  useEffect(() => {
    if (readFromSessionStorage) {
      sessionStorage.setItem(AUTH_TOKEN_KEY, authToken || "");
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken || "");
      sessionStorage.setItem(USER_NAME_ROLE, userName || "");
    }
  }, [authToken, refreshToken, readFromSessionStorage]);

  const signOut = () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    setAuthToken(undefined);
    setRefreshToken(undefined);
  };

  const authContextValueProps = useMemo(() => {
    return {
      userName,
      authToken,
      refreshToken,
      setAuthToken,
      setRefreshToken,
      signOut,
      readyState,
      setUserName,
    };
  }, [
    userName,
    authToken,
    refreshToken,
    setAuthToken,
    setRefreshToken,
    signOut,
    readyState,
    setUserName,
  ]);
  return (
    <authContext.Provider
      value={{
        ...authContextValueProps,
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
