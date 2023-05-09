import { useEffect, useState } from "react";
import { Box, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import DashboardApi from "./dashboardApi";
import EngineMonitoringPage from "./pages/engine";
import TorqueMonitoringPage from "./pages/torque";
import TurbineMonitoringPage from "./pages/turbine";
import BearingMonitoringPage from "./pages/bearing";
import MotorMonitoringPage from "./pages/motor";
import TabPanel from "src/app/components/tab-panel";

const useStyles = makeStyles()((theme) => {
  return {
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

const TabModuleRender = ({ type, moduleId }: any) => {
  const { t } = useTranslation();

  switch (type) {
    case "Engine":
      return (
        <Box>
          <EngineMonitoringPage />
        </Box>
      );

    case "Torque":
      return (
        <Box>
          <TorqueMonitoringPage />
        </Box>
      );
    case "Turbine":
      return (
        <Box>
          <TurbineMonitoringPage />
        </Box>
      );
    case "Bearing":
      return (
        <Box>
          <BearingMonitoringPage />
        </Box>
      );
    case "Motor":
      return (
        <Box>
          <MotorMonitoringPage />
        </Box>
      );
    default:
      return (
        <Box>
          <Typography>
            {t("dashboard.type.not.supported", { ns: "dashboard" })}
          </Typography>{" "}
        </Box>
      );
  }
};

const DashboardPage = () => {
  const [moduleTabs, setModuleTabs] = useState<any[]>([]);
  const [activeModule, setActiveModule] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { classes } = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    setModuleTabs([]);
    DashboardApi.getModules()
      .then((res) => {
        setModuleTabs(res.data.data || []);
        setIsLoading(false);
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
          <Typography>
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
          ></TabModuleRender>
        </TabPanel>
      ))}
    </Box>
  );
};
export default DashboardPage;
