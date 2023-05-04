import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import ConfigurationPage, {
  ManageConfigurationPage,
} from "./features/configuration";
import NotepadPage from "./features/notepad";
import FileBrowserPage from "./features/fileBrowser";
import HelpPage from "./features/help";
import SettingsPage from "./features/settings";
import { AUTH_STATUS, useAuth } from "./app/auth";
import FullScreenLoader from "./app/components/fullscreen-loader";
import CommonApi from "./commonApi";
import appContext from "./app/context";
import * as dateFns from "date-fns";

const AppRoutes = (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    {/* <Route path="login" element={<LoginPage />} /> */}
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
    <Route path="/configuration" element={<ManageConfigurationPage />}></Route>
    <Route
      path="/configuration/:configName"
      element={<ConfigurationPage></ConfigurationPage>}
    />
    <Route path="/notepad/*" element={<NotepadPage />}></Route>
    <Route path="/file-browser/*" element={<FileBrowserPage />}></Route>
    <Route path="/help/*" element={<HelpPage />}></Route>
    <Route path="/settings/*" element={<SettingsPage />}></Route>
  </Routes>
);

const LoginRoutes = (
  <Routes>
    <Route path="login" element={<LoginPage />} />
  </Routes>
);

export const LICENSE_STATUS = {
  INACTIVE: "inactive",
  ACTIVE: "active",
};

function App() {
  const [activeTheme, setActiveTheme] = useState<any>(lightTheme);

  const [licenseInfo, setLicenseInfo] = useState<any>();
  const [licenseStatus, setLicenseStatus] = useState<string>();

  const authenticator = useAuth();
  const navigate = useNavigate();
  const path = useLocation();

  console.log("path = ", path);
  console.log("authStatus 2= ", authenticator);

  const onLoadCheckLicense = () => {
    CommonApi.getLicenseInfo()
      .then((res) => {
        console.log("res data = ", res.data);
        const lic = {
          configCount: 0,
          expiryDate: "2023-07-28 09:21:12",
          isActive: "false",
        };
        setLicenseInfo(lic);
        if (lic !== undefined && lic.isActive === "true") {
          console.log("active");
          // set license active
          setLicenseStatus(LICENSE_STATUS.ACTIVE);
          if (lic.expiryDate === undefined) {
            // set license as inactive
            setLicenseStatus(LICENSE_STATUS.INACTIVE);
            return;
          }
          // else {
          //   const parsedDate = dateFns.parse(
          //     lic.expiryDate,
          //     "yyyy-MM-dd HH:mm:ss",
          //     new Date()
          //   );

          //   const currentDate = new Date();
          //   if (dateFns.isBefore(parsedDate, currentDate)) {
          //     setLicenseStatus(LICENSE_STATUS.EXPIRED);
          //     return;
          //   }
          // }
          if (lic.configCount >= 1) {
            // redirect to dashboard
            navigate("/dashboard");
            return;
          } else {
            // redirect to configuration screen
            navigate("/configuration");
            return;
          }
        } else {
          // redirect to activate license screen
          setLicenseStatus(LICENSE_STATUS.INACTIVE);
          console.log("in active");
          return;
        }
      })
      .catch((e) => {
        // console.log("eror", e);
        setLicenseInfo(undefined);
        setLicenseStatus(LICENSE_STATUS.INACTIVE);
        // Show login screen, then show license import screen
      });
  };

  useEffect(() => {
    onLoadCheckLicense();
  }, []);

  if (licenseStatus === LICENSE_STATUS.INACTIVE) {
    navigate("/login?inactive=true");
  }
  // else if (licenseStatus === LICENSE_STATUS.EXPIRED) {
  //   navigate("/login?expired=true");
  // }

  //   Active licensne and min one config.
  // -> dashboard
  // -> all other pages are disabled

  //

  // active licensne and no configuration.
  // -> login
  // -> config screen
  // ->dashboard inactive

  // inactive license
  // -> login with message invalid.
  // -> redirect to system screen where user can import license.

  return (
    <div className="App">
      <Suspense fallback={<FullScreenLoader />}>
        <appContext.Provider value={{ licenseInfo, licenseStatus }}>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            {path && ["/login", "/logout"].includes(path.pathname) ? (
              <>{LoginRoutes}</>
            ) : (
              <Layout>{AppRoutes}</Layout>
            )}
          </ThemeProvider>
        </appContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
