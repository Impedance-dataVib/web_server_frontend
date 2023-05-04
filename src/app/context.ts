import React from "react";

const initialState: {
  licenseStatus: any;
  licenseInfo: any;
} = {
  licenseStatus: undefined,
  licenseInfo: undefined,
};

const appContext = React.createContext(initialState);
export default appContext;
