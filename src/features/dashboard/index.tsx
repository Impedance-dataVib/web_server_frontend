import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import DashboardContext from "./context";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const [digitalIOData, setDigitalIOData] = useState({});
  const [systemData, setSystemData] = useState({});
  const [cpuUsage, setCPUUsage] = useState<number[]>([]);
  const [engineLatestReport, setEngineLatestReport] = useState<any>();
  const [bearingLatestReport, setBearingLatestReport] = useState<any>();
  const [motorLatestReport, setMotorLatestReport] = useState<any>();
  const [turbineLatestReport, setTurbineLatestReport] = useState<any>();
  const [gearboxLatestReport, setGearboxLatestReport] = useState<any>();

  const { t, i18n} = useTranslation();

  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("wss://echo.websocket.org");
      }, 2000);
    });
  }, []);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL || ''
    // getSocketUrl,
    // STATIC_OPTIONS
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== undefined) {
      const data = lastMessage?.data;
      if (data) {
        const parsedData = JSON.parse(data);
        console.log("message = ", JSON.parse(data));
        const digitalData = parsedData?.modules?.core?.["digital-io"];        
        setDigitalIOData(digitalData);

        const systemModuleData = parsedData?.modules?.core?.["system-info"];        
        setSystemData(systemModuleData);

        setCPUUsage((arr) => {
          const oldArr = arr;
          let newArr = oldArr;
          if (oldArr?.length > 100) {
            newArr = oldArr.slice(-99);
          }
          newArr.push(systemModuleData?.[`^cpu[100]#`]);
          return newArr;
        });

        const engineData = parsedData?.engines?.find((i: any) => i.name === 'Engine');


        const latestReportForEngine = engineData?.modules?.engine?.[`latest-reports`];
        console.log('latestReportForEngine = ', latestReportForEngine);
        setEngineLatestReport(latestReportForEngine || {});


        // "Bearing"
        const bearingData = parsedData?.engines?.find((i: any) => i.name === 'Bearing');
        const latestReportForBearing = bearingData?.modules?.bearing?.[`latest-reports`];
        console.log('latestReportForBearing = ', latestReportForBearing);
        setBearingLatestReport(latestReportForBearing || {});


        const motorData = parsedData?.engines?.find((i: any) => i.name === 'Motor');

        const latestReportForMotor = motorData?.modules?.motor?.[`latest-reports`];
        console.log('latestReportForMotor = ', latestReportForMotor);
        setMotorLatestReport(latestReportForMotor || {});

        const turbineData = parsedData?.engines?.find((i: any) => i.name === 'Turbine');

        const latestReportForTurbine = turbineData?.modules?.turbine?.[`latest-reports`];
        console.log('latestReportForTurbine = ', latestReportForTurbine);
        setTurbineLatestReport(latestReportForTurbine || {});

        const gearboxData = parsedData?.engines?.find((i: any) => i.name === "Gearbox");

        const latestReportForGearbox = gearboxData?.modules?.gearbox?.[`latest-reports`];
        console.log('latestReportForGearbox = ', latestReportForGearbox);
        setGearboxLatestReport(latestReportForGearbox || {});
      }
    }
  }, [lastMessage]);

  const changeLanguageToEnglish = () => {
    i18n.changeLanguage('en');
  }

  const changeLanguageToFrench = () => {
    i18n.changeLanguage('fr');
  }

  return (
    <Box>
      <Typography variant="h5">Dashboard</Typography>
      {/* <DashboardContext.Provider
        value={{ message: "Hi", digitalIOData, systemData, cpuUsage, engineLatestReport, bearingLatestReport, motorLatestReport, turbineLatestReport, gearboxLatestReport }}
      >
        <Box>Dashboard</Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Box sx={{ m: 2 }}>
            <NavLink to="/dashboard/engine">Engine</NavLink>{" "}
          </Box>
          <Box sx={{ m: 2 }}>
            <NavLink to="/dashboard/bearing">Bearing</NavLink>{" "}
          </Box>
          <Box sx={{ m: 2 }}>
            <NavLink to="/dashboard/motor">Motor</NavLink>{" "}
          </Box>
          <Box sx={{ m: 2 }}>
            <NavLink to="/dashboard/turbine">Turbine</NavLink>{" "}
          </Box>
          <Box sx={{ m: 2 }}>
            <NavLink to="/dashboard/gearbox">Gearbox</NavLink>{" "}
          </Box>

          <Box>
            <Button onClick={changeLanguageToEnglish}>English</Button>
            <Button onClick={changeLanguageToFrench}>French</Button>
          </Box>
        </Box>
        <Box sx={{ p: 2, background: "lightgrey" }}>
          <Outlet />
        </Box>
      </DashboardContext.Provider> */}
    </Box>
  );
};
export default DashboardPage;
