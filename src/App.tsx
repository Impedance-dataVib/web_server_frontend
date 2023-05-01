import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./features/dashboard";
import MotorMonitoringPage from "./features/dashboard/pages/motor";
import EngineMonitoringPage from "./features/dashboard/pages/engine";
import GearBoxMonitoringPage from "./features/dashboard/pages/gearbox";
import TurbineMonitoringPage from "./features/dashboard/pages/turbine";
import BearingMonitoringPage from "./features/dashboard/pages/bearing";
import LoginPage from "./features/login/login";
import LogoutPage from "./features/login/logout";
import Layout from "./app/components/layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./app/theme";
import TrendsPage from "./features/trends";
import ConfigurationPage from "./features/configuration";
import NotepadPage from "./features/notepad";
import FileBrowserPage from "./features/fileBrowser";
import HelpPage from "./features/help";
import SettingsPage from "./features/settings";
import { AUTH_STATUS, useAuth } from "./app/auth";
import FullScreenLoader from "./app/components/fullscreen-loader";

const AppRoutes = (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="logout" element={<LogoutPage />} />
    <Route path="/trends/*" element={<TrendsPage />}></Route>
    <Route path="/dashboard/*" element={<DashboardPage />}>
      <Route path="" index element={<EngineMonitoringPage />} />
      <Route path="engine" element={<EngineMonitoringPage />} />
      <Route path="gearbox" element={<GearBoxMonitoringPage />} />
      <Route path="turbine" element={<TurbineMonitoringPage />} />
      <Route path="bearing" element={<BearingMonitoringPage />} />
      <Route path="motor" element={<MotorMonitoringPage />} />
    </Route>
    <Route path="/configuration/*" element={<ConfigurationPage />}></Route>
    <Route path="/notepad/*" element={<NotepadPage />}></Route>
    <Route path="/file-browser/*" element={<FileBrowserPage />}></Route>
    <Route path="/help/*" element={<HelpPage />}></Route>
    <Route path="/settings/*" element={<SettingsPage />}></Route>
  </Routes>
);

function App() {
  const [activeTheme, setActiveTheme] = useState<any>(lightTheme);

  const authenticator = useAuth();

  console.log("authStatus 2= ", authenticator);

  return (
    <div className="App">
      <Suspense fallback={<FullScreenLoader />}>
        <ThemeProvider theme={activeTheme}>
          <CssBaseline />
          {/* {authenticator.authStatus  && <FullScreenLoader />} */}
          {!authenticator.readyState ? (
            <FullScreenLoader />
          ) : (
            <>
              {authenticator.readyState &&
              authenticator.authStatus !== AUTH_STATUS.AUTHENITCATED ? (
                <LoginPage />
              ) : (
                <Layout>{AppRoutes}</Layout>
              )}
            </>
          )}
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;
