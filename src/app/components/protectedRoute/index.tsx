import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_STATUS, useAuth } from "../../auth";

export interface IProtectedRoute {
  children: any;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const [canProceed, setCanProceed] = useState(true);

  const { authStatus, readyState } = useAuth();

  useEffect(() => {
    if (!readyState) {
      return;
    }
    if (authStatus === AUTH_STATUS.AUTHENITCATED) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [authStatus, readyState]);

  return <>{canProceed ? children : <Navigate to="/login" />}</>;
};
export default ProtectedRoute;
