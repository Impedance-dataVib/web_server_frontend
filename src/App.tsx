import React, { Suspense } from "react";
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

const AppRoutes = (
  <Routes>
    <Route path="login" element={<LoginPage />} />
    <Route path="logout" element={<LogoutPage />} />
    <Route path="/dashboard/*" element={<DashboardPage />}>
      <Route path="" index element={<EngineMonitoringPage />} />
      <Route path="engine" element={<EngineMonitoringPage />} />
      <Route path="gearbox" element={<GearBoxMonitoringPage />} />
      <Route path="turbine" element={<TurbineMonitoringPage />} />
      <Route path="bearing" element={<BearingMonitoringPage />} />
      <Route path="motor" element={<MotorMonitoringPage />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="App">
        <BrowserRouter>{AppRoutes}</BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
