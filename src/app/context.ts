import React from "react";

const initialState: {
  licenseStatus: any;
  licenseInfo: any;
  onLoadCheckLicense: () => void;
} = {
  licenseStatus: undefined,
  licenseInfo: undefined,
  onLoadCheckLicense: () => {}
};

const appContext = React.createContext(initialState);
export default appContext;
