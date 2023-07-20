import React, { createContext } from "react";

const DashboardContext = createContext<any>({
    digitalIOData: {},
    systemData: {},
    message: ''
});
export default DashboardContext;
