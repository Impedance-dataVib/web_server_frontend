import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashboardPage from "./features/dashboard";
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
import SystemConfiguration from "./features/systemConfiguration";
import DownloadPage from "./features/downloads";
// import { AUTH_STATUS, useAuth } from "./app/auth";
import FullScreenLoader from "./app/components/fullscreen-loader";
import CommonApi from "./commonApi";
import appContext from "./app/context";
import ProtectedRoute from "./app/components/protectedRoute";
import { SnackbarProvider } from "notistack";
import UnsavedPrompt from "./app/components/unsavedPrompt";

const AppRoutes = ({isUnsaved, setNavigatePath, setIsUnsaved, openConfirmBox, navigatePath, setOpenconfirmmBox }: any) => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    {/* <Route path="login" element={<LoginPage />} /> */}
    <Route path="logout" element={<LogoutPage />} />
    <Route
      path="/trends/*"
      element={
        <ProtectedRoute>
          <TrendsPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route path="/dashboard/*" element={<DashboardPage />}></Route>
    <Route
      path="/configuration"
      element={
        <ProtectedRoute>
          <ManageConfigurationPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path="/configuration/:configId"
      element={
        <ProtectedRoute>
          <ConfigurationPage 
            setNavigatePath={setNavigatePath}
            navigatePath={navigatePath}
            isUnsaved={isUnsaved}
            setIsUnsaved={setIsUnsaved}
            openConfirmBox={openConfirmBox}
            setOpenconfirmmBox={setOpenconfirmmBox}
          />
        </ProtectedRoute>
      }
    />
    <Route
      path="/notepad/*"
      element={
        <ProtectedRoute>
          <NotepadPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path="/file-browser/*"
      element={
        <ProtectedRoute>
          <FileBrowserPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path="/help/*"
      element={
        <ProtectedRoute>
          <HelpPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path="/settings/*"
      element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      }
    ></Route>

    <Route
      path="/systemconfiguration/*"
      element={
        <ProtectedRoute>
          <SystemConfiguration /> 
        </ProtectedRoute>
      }
    />
    <Route
      path="/download/*"
      element={
        <ProtectedRoute>
          <DownloadPage />
        </ProtectedRoute>
      }
    />
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
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [openConfirmBox, setOpenconfirmmBox] = useState(false);
  const [navigatePath, setNavigatePath] = useState(null);

  const [activeTheme, setActiveTheme] = useState<any>(lightTheme);

  const [licenseInfo, setLicenseInfo] = useState<any>();
  const [licenseStatus, setLicenseStatus] = useState<string>();
  const [licenseLoading, setLicenseLoading] = useState<boolean>(false);

  // const authenticator = useAuth();
  const navigate = useNavigate();
  const path = useLocation();

  const onLoadCheckLicense = () => {
    setLicenseLoading(true);
    CommonApi.getLicenseInfo()
      .then((res) => {
        setLicenseLoading(false);
        const lic = res.data;
          // {
          //   configCount: 1,
          //   expiryDate: "2023-01-03 06:42:35",
          //   isActive: false,
          // };
        setLicenseInfo(lic);
        if (lic !== undefined && String(lic.isActive) === "true") {
          // set license active
          setLicenseStatus(LICENSE_STATUS.ACTIVE);
          if (lic.expiryDate === undefined) {
            // set license as inactive
            setLicenseStatus(LICENSE_STATUS.INACTIVE);
            return;
          }
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
          return;
        }
      })
      .catch((e) => {
        setLicenseInfo(undefined);
        setLicenseStatus(LICENSE_STATUS.INACTIVE);
        setLicenseLoading(false);
        // Show login screen, then show license import screen
      });
  };

  useEffect(() => {
    onLoadCheckLicense();
  }, []);

  if (licenseStatus === LICENSE_STATUS.INACTIVE) {
    navigate("/login?inactive=true");
  }

  //   Active licensne and min one config.
  // -> dashboard
  // -> all other pages are disabled

  // active licensne and no configuration.
  // -> login
  // -> config screen
  // ->dashboard inactive

  // inactive license
  // -> login with message invalid.
  // -> redirect to system screen where user can import license.
  useEffect(() => {
    console.log('navigatePath', navigatePath);
    console.log('isUnsaved', isUnsaved);

  }, [navigatePath, isUnsaved])
  return (
    <div className="App">
      <Suspense fallback={<FullScreenLoader />}>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2500}
        >
          <appContext.Provider value={{ licenseInfo, licenseStatus, onLoadCheckLicense }}>
            <ThemeProvider theme={activeTheme}>
              <CssBaseline />
              {licenseLoading ? (
                <FullScreenLoader />
              ) : (
                <>
                  {path && ["/login"].includes(path.pathname) ? (
                    <>{LoginRoutes}</>
                  ) : (
                    <Layout isUnsaved={isUnsaved} openConfirmBox={openConfirmBox} setOpenconfirmmBox={setOpenconfirmmBox} setNavigatePath={setNavigatePath}>
                      <UnsavedPrompt isUnsaved={isUnsaved} />
                      <AppRoutes 
                        navigatePath={navigatePath}
                        setNavigatePath={setNavigatePath}
                        isUnsaved={isUnsaved}
                        setIsUnsaved={setIsUnsaved}
                        openConfirmBox={openConfirmBox}
                        setOpenconfirmmBox={setOpenconfirmmBox}
                      />
                    </Layout>
                  )}
                </>
              )}
            </ThemeProvider>
          </appContext.Provider>
        </SnackbarProvider>
      </Suspense>
    </div>
  );
}

export default App;
