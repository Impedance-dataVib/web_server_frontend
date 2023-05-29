import { useContext, useEffect, useState, useRef } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useWebSocket from "react-use-websocket";

import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import DashboardApi from "./dashboardApi";
import ModuleMonitoringPage from "./pages/module";
import TabPanel from "src/app/components/tab-panel";
import appContext from "src/app/context";
import * as dateFns from "date-fns";
import { webSocketData } from "./schema";
// import { webSocketData } from "./schema";

const useStyles = makeStyles()((theme) => {
  return {
    trendsTabRoot: {
      minHeight: "auto",
    },
    tabsRoot: {
      height: "34px",
      minHeight: "34px",
    },
    tabRoot: {
      background: "#fff",
      borderRadius: "4px",
      border: "1px solid #f7f7f7",
      height: "34px",
      minHeight: "34px",
      "&.Mui-selected": {
        background: theme.palette.primary.main,
        color: "#fff",
      },
    },
    tabIndicator: {
      display: "none",
    },
    activeTab: {
      background: theme.palette.primary.main,
      color: "#fff",
    },
  };
});

export interface IActiveModule {
  name: string;
  index: number;
}

function tabProps(index: number) {
  return {
    id: `dashboard-module-tab-${index}`,
    "aria-controls": `dashboard-module-tabpanel-${index}`,
  };
}

const TabModuleRender = ({ type, moduleData, classes, trendsData }: any) => {
  const { t } = useTranslation();

  switch (type) {
    case "Engine":
    case "Torque":
    case "Turbine":
    case "Motor":
    case "Bearing":
      return (
        <Box>
          <ModuleMonitoringPage
            moduleData={moduleData}
            classes={classes}
            trendsData={trendsData}
          />
        </Box>
      );
    default:
      return (
        <Box>
          <Typography component="span" variant="body1">
            {t("dashboard.type.not.supported", { ns: "dashboard" })}
          </Typography>{" "}
        </Box>
      );
  }
};

const DashboardPage = () => {
  const [moduleTabs, setModuleTabs] = useState<any[]>([]);
  const [webSocketsData, setWebSocketsData] = useState({});
  const [trendsData, setTrendsData] = useState({});
  const [activeModule, setActiveModule] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLicenseExpiryMsg, setShowLicenseExpiryMsg] =
    useState<boolean>(false);
  const [licExpiryText, setLicExpiryText] = useState<string>("");

  const { classes } = useStyles();
  const { t } = useTranslation();

  const { licenseInfo, licenseStatus } = useContext(appContext);
  const intervalHandle = useRef();
  console.log(process.env)
  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL || `ws:${window.location.hostname}:8081`,
    {
      onOpen: () => console.log("opened"),
      onMessage: () => {
        if (sendMessage) sendMessage(moduleTabs[activeModule].process_name);
      },
    }
  );

  useEffect(() => {
    if (moduleTabs.length > 0) {
      if (moduleTabs[activeModule].process_name) {
        sendMessage(moduleTabs[activeModule].process_name);
        DashboardApi.getTrendsData(moduleTabs[activeModule].id).then((data) => {
          setTrendsData(data);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [moduleTabs, activeModule]);

  useEffect(() => {
    if (lastMessage !== undefined) {
      const data = lastMessage?.data;
      if (data) {
        const parsedData = JSON.parse(data);
        console.log("lastMessage", parsedData);
        setWebSocketsData(parsedData);
        setIsLoading(false);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (licenseInfo && licenseStatus && intervalHandle) {
      // @ts-expect-error
      intervalHandle.current = setInterval(() => {
        const expiryDate = licenseInfo?.expiryDate;
        if (
          expiryDate !== undefined &&
          String(expiryDate)?.trim()?.length >= 0
        ) {
          const parsedExpiryDate = dateFns.parse(
            expiryDate,
            "yyyy-MM-dd HH:mm:ss",
            new Date()
          );

          const currentDate = new Date();
          const fifteenDaysBeforeExpiry = dateFns.subDays(parsedExpiryDate, 15);
          if (dateFns.isBefore(parsedExpiryDate, currentDate)) {
            // already expired, do nothing - should be redirected to license import page
            setShowLicenseExpiryMsg(false);
            setLicExpiryText("");
          } else if (dateFns.isBefore(fifteenDaysBeforeExpiry, currentDate)) {
            // in 15 days range
            setShowLicenseExpiryMsg(true);
            setLicExpiryText(
              dateFns.format(parsedExpiryDate, "dd MMM yyyy, H:mm a")
            );
          } else {
            setShowLicenseExpiryMsg(false);
            setLicExpiryText("");
          }
        }
      }, 3000);
    }
    return () => {
      if (intervalHandle.current) {
        clearInterval(intervalHandle.current);
      }
    };
  }, [licenseInfo, licenseStatus, intervalHandle]);

  useEffect(() => {
    setIsLoading(true);
    DashboardApi.getModules()
      .then((res) => {
        if (res.length) setModuleTabs(res || []);
        else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setModuleTabs([]);
        setIsLoading(false);
      });
  }, []);

  const onActiveModuleChange = (event: any, params: any) => {
    setActiveModule(params);
  };

  return (
    <Box>
      {showLicenseExpiryMsg && (
        <Box sx={{ my: 1 }}>
          <Alert
            severity="warning"
            onClose={() => {
              clearInterval(intervalHandle.current);
              setShowLicenseExpiryMsg(false);
            }}
          >
            <AlertTitle>
              {t("dashboard.lic.alert.title", { ns: "dashboard" })}
            </AlertTitle>
            <Typography variant="caption" component={"span"}>
              {t("dashboard.lic.alert.text.part1", { ns: "dashboard" })}{" "}
              {licExpiryText}
            </Typography>
          </Alert>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h5">
          {t("dashboard.heading.text", { ns: "dashboard" })}
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography component="span" variant="body1">
            {isLoading
              ? t("dashboard.loading.module.text", { ns: "dashboard" })
              : t("dashboard.module.text", { ns: "dashboard" })}
          </Typography>

          <Box sx={{ ml: 1 }}>
            <Tabs
              value={activeModule}
              onChange={onActiveModuleChange}
              aria-label="select modules"
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabIndicator,
              }}
            >
              {moduleTabs?.map((tabElement: any, index: number) => (
                <Tab
                  key={index}
                  label={tabElement.name}
                  {...tabProps(index)}
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.activeTab,
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
      </Box>

      {moduleTabs?.map((item: any, index: any) => (
        <TabPanel key={item.id} value={activeModule} index={index}>
          <TabModuleRender
            moduleId={item.id}
            type={item.module_type}
            moduleData={webSocketsData}
            classes={classes}
            trendsData={trendsData}
          />
        </TabPanel>
      ))}
    </Box>
  );
};
export default DashboardPage;
