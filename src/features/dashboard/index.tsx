import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { makeStyles } from "tss-react/mui";

import DashboardContext from "./context";
import { useTranslation } from "react-i18next";
import CardWidget from "../../app/components/card";
import {
  CellTowerOutlined,
  DescriptionOutlined,
  SignpostOutlined,
  TrendingUp,
  VisibilityOutlined,
  Warning,
  WarningAmber,
  WarningOutlined,
} from "@mui/icons-material";
import AlertsAndInstructions from "../common/alertsAndInstructions";
import ReportsCard from "../common/reports";
import GlobalIndicatorChart from "./globalIndicator";

const useStyles = makeStyles()((theme) => {
  return {
    grouped: {
      marginLeft: "8px !important",
      border: "none",
      borderRadius: "4px",
    },
    toggleBtnRoot: {
      background: theme?.palette?.color3?.main,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: "4px !important",
      "&hover": {
        background: theme?.palette?.color3?.main,
      },
      textTransform: "none",
    },
    toggleBtnSelected: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      background: `${theme?.palette?.color37?.main} !important`,
      color: `${theme?.palette?.color3?.main} !important`,
    },
  };
});

export interface IActiveModule {
  name: string;
  index: number;
}

const DashboardPage = () => {
  const [digitalIOData, setDigitalIOData] = useState({});
  const [systemData, setSystemData] = useState({});
  const [cpuUsage, setCPUUsage] = useState<number[]>([]);
  const [engineLatestReport, setEngineLatestReport] = useState<any>();
  const [bearingLatestReport, setBearingLatestReport] = useState<any>();
  const [motorLatestReport, setMotorLatestReport] = useState<any>();
  const [turbineLatestReport, setTurbineLatestReport] = useState<any>();
  const [gearboxLatestReport, setGearboxLatestReport] = useState<any>();

  const [moduleTabs, setModuleTabs] = useState<string[]>([]);
  const [activeModules, setActiveModules] = useState<string[]>([]);

  const { classes } = useStyles();

  const { t, i18n } = useTranslation();

  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("wss://echo.websocket.org");
      }, 2000);
    });
  }, []);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    // process.env.REACT_APP_WEBSOCKET_URL || ""
    ""
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
      console.log("lastMessage = ", lastMessage);
      if (data) {
        const parsedData = JSON.parse(data);
        console.log("message = ", JSON.parse(data));

        if (
          parsedData &&
          parsedData?.engines &&
          Array.isArray(parsedData?.engines)
        ) {
          const moduleArr = parsedData?.engines?.map((i: any) => i?.name) || [];
          setModuleTabs(moduleArr);
        }

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

        const engineData = parsedData?.engines?.find(
          (i: any) => i.name === "Engine"
        );

        const latestReportForEngine =
          engineData?.modules?.engine?.[`latest-reports`];
        console.log("latestReportForEngine = ", latestReportForEngine);
        setEngineLatestReport(latestReportForEngine || {});

        // "Bearing"
        const bearingData = parsedData?.engines?.find(
          (i: any) => i.name === "Bearing"
        );
        const latestReportForBearing =
          bearingData?.modules?.bearing?.[`latest-reports`];
        console.log("latestReportForBearing = ", latestReportForBearing);
        setBearingLatestReport(latestReportForBearing || {});

        const motorData = parsedData?.engines?.find(
          (i: any) => i.name === "Motor"
        );

        const latestReportForMotor =
          motorData?.modules?.motor?.[`latest-reports`];
        console.log("latestReportForMotor = ", latestReportForMotor);
        setMotorLatestReport(latestReportForMotor || {});

        const turbineData = parsedData?.engines?.find(
          (i: any) => i.name === "Turbine"
        );

        const latestReportForTurbine =
          turbineData?.modules?.turbine?.[`latest-reports`];
        console.log("latestReportForTurbine = ", latestReportForTurbine);
        setTurbineLatestReport(latestReportForTurbine || {});

        const gearboxData = parsedData?.engines?.find(
          (i: any) => i.name === "Gearbox"
        );

        const latestReportForGearbox =
          gearboxData?.modules?.gearbox?.[`latest-reports`];
        console.log("latestReportForGearbox = ", latestReportForGearbox);
        setGearboxLatestReport(latestReportForGearbox || {});
      }
    }
  }, [lastMessage]);

  const changeLanguageToEnglish = () => {
    i18n.changeLanguage("en");
  };

  const changeLanguageToFrench = () => {
    i18n.changeLanguage("fr");
  };

  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModules(params);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h5">Dashboard</Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography>Select Module:</Typography>
          <Box>
            <ToggleButtonGroup
              exclusive={true}
              fullWidth
              classes={{
                grouped: classes?.grouped,
              }}
              value={activeModules || []}
              onChange={onActiveModuleChange}
            >
              {moduleTabs &&
                moduleTabs?.map((t: string) => (
                  <ToggleButton
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    size="small"
                    sx={{ ml: 1 }}
                    value={t}
                    classes={{
                      root: classes.toggleBtnRoot,
                      selected: classes.toggleBtnSelected,
                    }}
                    // onChange={onActiveModuleChange}
                  >
                    {t}
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>

      <DashboardContext.Provider
        value={{
          message: "",
          digitalIOData,
          systemData,
          cpuUsage,
          engineLatestReport,
          bearingLatestReport,
          motorLatestReport,
          turbineLatestReport,
          gearboxLatestReport,
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* <Outlet /> */}
          <Grid container spacing={2}>
            <Grid item lg={5} md={6} sm={12}>
              <AlertsAndInstructions></AlertsAndInstructions>
              
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <CardWidget
                headerLabel="Global Indicators"
                headerIcon={<SignpostOutlined />}
                content={<GlobalIndicatorChart />}
                initiallyCollapsed={false}
              />
            </Grid>
            <Grid item xs={12}>
              <CardWidget
                headerLabel="Trends"
                headerIcon={<TrendingUp />}
                content={<div>PlaceHolder Content</div>}
                initiallyCollapsed={false}
              />
            </Grid>
            <Grid item xs={4}>
              <CardWidget
                headerLabel="Live Status"
                headerIcon={<VisibilityOutlined />}
                content={<div>PlaceHolder Content</div>}
                initiallyCollapsed={true}
              />
            </Grid>
            <Grid item xs={4}>
              <CardWidget
                headerLabel="Signals"
                headerIcon={<CellTowerOutlined />}
                content={<div>PlaceHolder Content</div>}
                initiallyCollapsed={true}
              />
            </Grid>
            <Grid item xs={4}>
              
              <ReportsCard />
            </Grid>
          </Grid>
        </Box>
      </DashboardContext.Provider>
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
