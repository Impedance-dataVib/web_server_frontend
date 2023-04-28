import React, { useState } from "react";

export const AUTH_STATUS = {
  AUTHENITCATED: "authenticated",
  LOADING: "loading",
  IN_PROGRESS: "in_progress",
  UNAUTHENTICATED: "un_authenticated",
};

export const useAuthenticator = () => {
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.UNAUTHENTICATED);
  return { authStatus };
};
